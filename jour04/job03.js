// import de Mongoose
const mongoose = require('mongoose');

// Connexion à la BDD
mongoose.connect('mongodb://localhost:27017/LaPlateforme');

// Création du schema Student

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,

})

const Student = mongoose.model('Student', studentSchema, 'student');

// Creation des documents dans la collection student

/* Student.create([
    { firstname: "Bob", lastname: "LeBricoleur" },
    { firstname: "John", lastname: "Doe" },
    { firstname: "Marine", lastname: "Dupont" }
  ])
  .then(users => console.log("Étudiants créés:", users))
  .catch(err => console.log("Erreurs lors de la création des étudiants: ", err));
   */
