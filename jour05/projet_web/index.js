const express = require('express')
// NOTE : J'ai aussi installé le module nodemon pour ne pas avoir à relancer mon serveur à chaque fois que je fais une modif : npm install -g nodemon
// Du coup je lance mon appli en faisant nodemon index.js plutôt que node index.js

const path = require('path')
const app = express()
// NOTE : je ne peux pas utiler le port 80 du sujet car sur mon système d'exploitation il est utilisé en permanence par Apache
// Du coup j'ai choisi un port non privilégié : 3000
const port = 3000 


// Définir le chemin vers le dossier views où se trouvent les fichiers HTML
const publicPath = path.join(__dirname, 'views')


app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, '/index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(publicPath, '/about.html'))
})


// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(publicPath, '404.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})