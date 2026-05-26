const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


const salas = [
    { id: 'en', nombre: 'Inglés', pais: 'EE.UU.', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/liberty.png' },
    { id: 'zh', nombre: 'Chino Mandarín', pais: 'China', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/china.png' },
    { id: 'hi', nombre: 'Hindi', pais: 'India', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/india.png' },
    { id: 'es', nombre: 'Español', pais: 'España', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/spain.png' },
    { id: 'fr', nombre: 'Francés', pais: 'Francia', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/eiffel.png' }
];

// Route to render index page
app.get('/', (req, res) => {
  res.render('index', { salas });
});


app.get('/sala/:id', async (req, res) => {
  const roomId = req.params.id; // 'en', 'es', etc.
  console.log(req.params)
  const participantName = req.query.name || `User-${Math.floor(Math.random() * 100)}`;

  // Find your existing sala object to pass to pug layout (matching your current logic)
  const sala = salas.find(s => s.id === roomId) //|| { id: roomId, nombre: roomId };

  try {
    // Generate the secure LiveKit token for this user and this specific room
    const at = new AccessToken('myappkey', 'myappsecret', {
      identity: participantName,
    });
    
    at.addGrant({ roomJoin: true, room: roomId });
    const token = await at.toJwt();

    // Render sala.pug passing your layout object + livekit data
    res.render('sala', {
      sala,
      token,
      livekitUrl: 'wss://3-229-212-146.nip.io'
    });
  } catch (error) {
    console.error("Error generating LiveKit token:", error);
    res.status(500).send("Server Error configuration LiveKit token.");
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Express server running on port ${PORT}`);
});





