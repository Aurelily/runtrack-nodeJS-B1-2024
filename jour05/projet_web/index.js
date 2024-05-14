const express = require('express')
const app = express()
// NOTE : je ne peux pas utiler le port 80 du sujet car sur mon système d'exploitation il est utilisé en permanence par Apache
// Du coup j'ai choisi un port non privilégié : 3000
const port = 3000 

app.get('/', (req, res) => {
  res.send('HOME PAGE')
})

app.get('/about', (req, res) => {
  res.send('ABOUT PAGE')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})