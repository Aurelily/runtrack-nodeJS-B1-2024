import { createServer } from 'http';
import { readFile } from 'fs';
import { resolve } from 'path';

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
  } else if (req.url === '/about') {
    // Lire le fichier about.html
    readFile(resolve('about.html'), (err, data) => {
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
    // Rediriger vers la page error.html pour toute autre URL
    readFile(resolve('error.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erreur interne du serveur');
        return;
      }

      // Envoyer le contenu de la page error.html
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

// Démarre un serveur HTTP simple localement sur le port 3000
server.listen(3000, 'localhost', () => {
  console.log('Listening on 127.0.0.1:3000');
});
