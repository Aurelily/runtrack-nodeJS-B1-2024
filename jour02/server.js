// ATTENTION : il faut d'abord faire un npm init pour créer un package.json, puis rajouter dans celui ci : "type": "module" (sinon on ne pourra pas le lancer directement avec node index.js, il faudra utiliser un fichier index.mjs)

// server.js

import { createServer } from 'http';

const server = createServer();

export default server;
