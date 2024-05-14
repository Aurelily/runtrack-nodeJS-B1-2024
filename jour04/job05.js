// import de Mongoose
const mongoose = require('mongoose');

// Connexion à la BDD
mongoose.connect('mongodb://localhost:27017/LaPlateforme');

// Création des schemas
const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    year_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        required: true
    }
});

const yearSchema = new mongoose.Schema({
    year: String,
})

// Initialisation des schemas dans des variables
const Student = mongoose.model('Student', studentSchema, 'student');
const Year = mongoose.model('Year', yearSchema, 'year');



// Requête pour récupérer l'ensemble des étudiants avec leurs cursus
Student.find().populate('year_id').then(students => {
    // Afficher le résultat dans la console
    console.log("Liste des étudiants avec leurs cursus :");
    students.forEach(student => {
        console.log(`${student.firstname} ${student.lastname} - Cursus: ${student.year_id.year}`);
    });
}).catch(err => {
    console.error("Erreur lors de la récupération des étudiants :", err);
});


  

  
