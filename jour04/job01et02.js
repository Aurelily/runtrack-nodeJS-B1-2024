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

