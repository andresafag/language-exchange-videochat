const express = require('express');
const { AccessToken, RoomServiceClient } = require('livekit-server-sdk')
const { RoomAgentDispatch, RoomConfiguration } = require('@livekit/protocol');
const fs = require('fs');
const app = express();
app.disable('x-powered-by');
const path = require('path');
const AGENT_NAME = 'marina';
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const REMOTE_IP = process.env.MY_TARGET_IP
const myappkey = process.env.MY_APP_KEY;
const myappsecret = process.env.MY_APP_SECRET;

const salas = [
    { id: 'en', nombre: 'Inglés', pais: 'EE.UU.', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/liberty.png' },
    { id: 'zh', nombre: 'Chino Mandarín', pais: 'China', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/china.png' },
    { id: 'hi', nombre: 'Hindi', pais: 'India', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/india.png' },
    { id: 'es', nombre: 'Español', pais: 'España', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/spain.png' },
    { id: 'fr', nombre: 'Francés', pais: 'Francia', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/eiffel.png' }
];

const roomService = new RoomServiceClient(
`https://${REMOTE_IP}`,
  myappkey, 
  myappsecret
);

// Route to render index page
app.get('/', (req, res) => {
  res.render('index', { salas });
});

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.get('/sala/:id', async (req, res) => {

  const roomId = req.params.id;
  const participantName =
    req.query.name || `User-${Math.floor(Math.random() * 100)}`;

  try {

    const participants = await roomService.listParticipants(roomId);

    // Maximum 9 human users
    if (participants.length >= 9) {
      const sala = salas.find(s => s.id === roomId);

      return res.redirect(
        `/?error=sala_llena&salaName=${encodeURIComponent(sala.nombre)}`
      );
    }

    const sala = salas.find(s => s.id === roomId);

    const at = new AccessToken(myappkey, myappsecret, {
      identity: participantName,
    });

    // Allow participant to join the LiveKit room
    at.addGrant({
      roomJoin: true,
      room: roomId
    });

    // Language associated with the room
    const languages = {
      en: 'English',
      hi: 'Hindi',
      zh: 'Chinese',
      es: 'Spanish',
      fr: 'French'
    };

    const language = languages[roomId];

    // Tell LiveKit to dispatch the AI agent
    // when the room is created by the first participant.
    at.roomConfig = new RoomConfiguration({
      agents: [
        new RoomAgentDispatch({
          agentName: AGENT_NAME,
          metadata: JSON.stringify({
            roomId: roomId,
            language: language,
            participantName: participantName
          })
        })
      ]
    });

    const token = await at.toJwt();

    res.render('sala', {
      sala,
      token,
      livekitUrl: `wss://${REMOTE_IP}`
    });

  } catch (error) {

    console.error(
      "Error generating LiveKit token:",
      error
    );

    res.status(500).send(
      "Server Error configuration LiveKit token."
    );
  }
});

app.get('/full', (req, res) => {
  res.render('full');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Express server running on port ${PORT}`);
});





