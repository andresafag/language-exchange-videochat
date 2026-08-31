const { spawn } = require('child_process');
const http = require('http');

const port = 3101;
const child = spawn(process.execPath, ['app.js'], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: String(port), MY_TARGET_IP: '3-229-212-146.nip.io' },
  stdio: ['ignore', 'pipe', 'pipe']
});

let output = '';
child.stdout.on('data', (chunk) => {
  output += chunk.toString();
});
child.stderr.on('data', (chunk) => {
  output += chunk.toString();
});

function requestHealth(retries = 10) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get({ hostname: '127.0.0.1', port, path: '/health' }, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk.toString();
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body });
        });
      });

      req.on('error', (error) => {
        if (retries > 0) {
          setTimeout(() => requestHealth(retries - 1).then(resolve).catch(reject), 500);
        } else {
          reject(error);
        }
      });
    };

    attempt();
  });
}

const timeout = setTimeout(() => {
  child.kill();
  console.error(output);
  process.exit(1);
}, 15000);

(async () => {
  try {
    const result = await requestHealth();
    clearTimeout(timeout);
    child.kill();

    if (result.statusCode !== 200) {
      console.error(`Expected status 200, got ${result.statusCode}`);
      process.exit(1);
    }

    console.log('Smoke test passed:', result.body);
  } catch (error) {
    clearTimeout(timeout);
    child.kill();
    console.error(error.message);
    process.exit(1);
  }
})();
