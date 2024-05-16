const express = require('express');
const studentRouter = require('./routes/student');

const app = express();


// Database connection
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/LaPlateforme');

const db = mongoose.connection;
const port = 3000;

db.on("connected", () => {
  console.log(`Connected MongoDB database ${db.name} à ${db.host}:${db.port}`);
});

db.on("error", (err) => {
  console.error(`Error in MongoDb connection: ${err}`);
  process.exit();
});


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utiliser le routeur étudiant
app.use(studentRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
