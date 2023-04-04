// Importamos las dependencias necesarias para el servidor
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// Definimos el puerto en el que se ejecutará el servidor
const PORT = 3000;

// Configuramos una ruta para servir el archivo HTML al cliente
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Configuramos Socket.io para manejar la conexión del cliente
io.on('connection', (socket) => {
  console.log('a user connected'); // Imprimimos un mensaje en la consola cuando un cliente se conecta al servidor

  // Manejamos la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('user disconnected'); // Imprimimos un mensaje en la consola cuando un cliente se desconecta del servidor
  });

  // Manejamos los mensajes de chat enviados por el cliente
  socket.on('chat message', (msg) => {
    console.log('message received:', msg); // Imprimimos un mensaje en la consola cuando recibimos un mensaje de chat del cliente
    io.emit('chat message', msg); // Emitimos el mensaje a todos los clientes conectados al servidor, incluyendo al cliente que lo envió
    console.log('message sent:', msg); // Imprimimos un mensaje en la consola cuando enviamos un mensaje de chat a los clientes
  });
});

// Iniciamos el servidor y lo hacemos escuchar en el puerto especificado
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});