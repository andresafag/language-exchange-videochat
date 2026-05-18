const express = require('express');
const http = require('http');
// const https = require('https')
const fs = require('fs');
// const opcionesHttps = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };



const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
// const server = https.createServer(opcionesHttps, app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const path = require('path');
app.use('/peerjs', express.static(path.join(__dirname, 'node_modules/peerjs/dist')));

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));



const salas = [
    { id: 'en', nombre: 'Inglés', pais: 'EE.UU.', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/liberty.png' },
    { id: 'zh', nombre: 'Chino Mandarín', pais: 'China', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/china.png' },
    { id: 'hi', nombre: 'Hindi', pais: 'India', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/india.png' },
    { id: 'es', nombre: 'Español', pais: 'España', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/spain.png' },
    { id: 'fr', nombre: 'Francés', pais: 'Francia', img: 'https://speakswap-website.s3.us-east-1.amazonaws.com/public/eiffel.png' }
];

// Ruta 1: Inicio (Lista de salas)
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Salas de Idiomas', salas });
});

// Ruta 2: Detalle de sala
app.get('/sala/:id', (req, res) => {
    const sala = salas.find(s => s.id === req.params.id);
    const secretIP = process.env.MY_TARGET_IP 
    res.render('sala', { sala , secretIP});
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId, userName) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const numUsuarios = room ? room.size : 0;

    if (numUsuarios >= 10) {
      socket.emit('sala-llena', roomId);
      return;
    }

    socket.join(roomId);

    // Guardar datos del usuario en el socket
    socket.data.userId = userId;
    socket.data.userName = userName;

    // Emitir lista completa de usuarios a todos en la sala
    io.to(roomId).emit('room-users', getUsersInRoom(roomId));

    // Manejar desconexión
    socket.on('disconnect', () => {
      io.to(roomId).emit('room-users', getUsersInRoom(roomId));
    });
  });
});

// Helper para obtener usuarios de la sala
function getUsersInRoom(roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  const usuarios = [];
  if (room) {
    for (const peerId of room) {
      const peerSocket = io.sockets.sockets.get(peerId);
      if (peerSocket && peerSocket.data) {
        usuarios.push({
          id: peerSocket.data.userId,
          name: peerSocket.data.userName
        });
      }
    }
  }
  return usuarios;
}




server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor HTTPS escuchando en el puerto 3000');});