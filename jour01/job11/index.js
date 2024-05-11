// ATTENTION : il faut d'abord faire un npm init pour créer un package.json, puis rajouter dans celui ci : "type": "module" (sinon on ne pourra pas le lancer directement avec node index.js, il faudra utiliser un fichier index.mjs)

import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 8888
server.listen(8888, 'localhost', () => {
  console.log('Listening on 127.0.0.1:8888');
  console.log('Hello World!\n');
});


