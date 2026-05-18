const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


const salas = [
    { id: 'en', nombre: 'Inglés', pais: 'EE.UU.', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/liberty.png' },
    { id: 'zh', nombre: 'Chino Mandarín', pais: 'China', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/china.png' },
    { id: 'hi', nombre: 'Hindi', pais: 'India', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/india.png' },
    { id: 'es', nombre: 'Español', pais: 'España', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/spain.png' },
    { id: 'fr', nombre: 'Francés', pais: 'Francia', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/eiffel.png' }
];

app.get('/sala/:id', (req, res) => {
  const sala = { id: req.params.id, nombre: `Sala ${req.params.id}` };
  res.render('sala', { sala, secretIP: process.env.MY_TARGET_IP });
});

app.get('/getToken', (req, res) => {
  const room = req.query.room;
  const name = req.query.name || "Guest";

  const at = new AccessToken(
    "myappkey",
    "myappsecret",
    { identity: name }
  );

  at.addGrant({ roomJoin: true, room });

  res.send(at.toJwt());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Express server running on port ${PORT}`);
});

// io.on('connection', (socket) => {
//   socket.on('join-room', (roomId, userId, userName) => {
//     const room = io.sockets.adapter.rooms.get(roomId);
//     const numUsuarios = room ? room.size : 0;

//     if (numUsuarios >= 10) {
//       socket.emit('sala-llena', roomId);
//       return;
//     }

//     socket.join(roomId);

//     // Guardar datos del usuario en el socket
//     socket.data.userId = userId;
//     socket.data.userName = userName;

//     // Emitir lista completa de usuarios a todos en la sala
//     io.to(roomId).emit('room-users', getUsersInRoom(roomId));

//     // Manejar desconexión
//     socket.on('disconnect', () => {
//       io.to(roomId).emit('room-users', getUsersInRoom(roomId));
//     });
//   });
// });

// // Helper para obtener usuarios de la sala
// function getUsersInRoom(roomId) {
//   const room = io.sockets.adapter.rooms.get(roomId);
//   const usuarios = [];
//   if (room) {
//     for (const peerId of room) {
//       const peerSocket = io.sockets.sockets.get(peerId);
//       if (peerSocket && peerSocket.data) {
//         usuarios.push({
//           id: peerSocket.data.userId,
//           name: peerSocket.data.userName
//         });
//       }
//     }
//   }
//   return usuarios;
// }




