// legacy way to create a dev server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Hello world');
})

server.listen(3000);
