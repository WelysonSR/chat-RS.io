const koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new koa();
const server = http.createServer(app.callback());
const io = socket(server);

io.on('connection', (socket) => {
  console.log('[IO] Message => A new connection has been established');
  socket.on('chat.message', (message) => {
    console.log(`[IO] Chat-Message => ${message}`)
    io.emit('chat.message', message);
  });
  socket.on('disconnect', () => console.log('[IO] Message => A connection has been closed'));
}).on('error', (err) => console.log(`[IO] Error => ${err}`));

const SERVER_HOST = 'localhost'; 
const SERVER_PORT = 8080;

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server listening on ${SERVER_HOST}:${SERVER_PORT}`);
  console.log('Press Ctrl+C to stop.');
});

