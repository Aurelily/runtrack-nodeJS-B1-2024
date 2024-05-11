import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { resolve } from 'node:path';

const server = createServer((req, res) => {
  if (req.url === '/') {
    // Lire le fichier index.html
    readFile(resolve('index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erreur interne du serveur');
        return;
      }

      // Envoyer le contenu du fichier HTML
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    // Si l'URL demandée n'est pas la racine, renvoyer une erreur 404
    res.writeHead(404);
    res.end('Page non trouvée');
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, 'localhost', () => {
  console.log('Listening on 127.0.0.1:3000');
});
