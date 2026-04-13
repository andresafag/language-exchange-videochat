const express = require('express');
const https = require('https');
const fs = require('fs');
const opcionesHttps = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};



const { Server } = require('socket.io');
const app = express();
// Crear el servidor HTTPS
const server = https.createServer(opcionesHttps, app);
const io = new Server(server);
const path = require('path');
app.use('/peerjs', express.static(path.join(__dirname, 'node_modules/peerjs/dist')));

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));





const salas = [
    { id: 'en', nombre: 'Inglés', pais: 'EE.UU.', img: '/liberty.png' },
    { id: 'zh', nombre: 'Chino Mandarín', pais: 'China', img: '/china.png' },
    { id: 'hi', nombre: 'Hindi', pais: 'India', img: '/india.png' },
    { id: 'es', nombre: 'Español', pais: 'España', img: '/spain.png' },
    { id: 'fr', nombre: 'Francés', pais: 'Francia', img: '/eiffel.png' }
];

// Ruta 1: Inicio (Lista de salas)
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Salas de Idiomas', salas });
});

// Ruta 2: Detalle de sala
app.get('/sala/:id', (req, res) => {
    const sala = salas.find(s => s.id === req.params.id);
    res.render('sala', { sala });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    // 1. Contar cuántas personas hay en la sala actualmente
    const room = io.sockets.adapter.rooms.get(roomId);
    const numUsuarios = room ? room.size : 0;

    // 2. Si hay 10 o más, avisar al usuario y no dejarlo entrar
    if (numUsuarios >= 10) {
      socket.emit('sala-llena', roomId);
      return; // Detenemos la ejecución aquí
    }

    // 3. Si hay espacio, procedemos normal
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});


server.listen(3000, '0.0.0.0', () => {
    console.log('Servidor HTTPS seguro corriendo en:');
    console.log('Local: https://localhost:3000');
    console.log('Red:   https://TU-IP-LOCAL:3000');
});