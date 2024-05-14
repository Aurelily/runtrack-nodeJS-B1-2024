// import de Mongoose
const mongoose = require('mongoose');

// Connexion à la BDD
mongoose.connect('mongodb://localhost:27017/LaPlateforme');

// Création des schemas
// Pour associer un cursus à un étudiant je modifie le schema Student
const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    // Ajout d'un champ pour stocker la référence au cursus
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


// part 1 - Creation des documents dans la collection year
// --------------------------------------------------------
/* Year.create([
    { year: "Bachelor 1"},
    { year: "Bachelor 2"},
    { year: "Bachelor 3"}
  ])
  .then(year => console.log("Cursus créés:", year))
  .catch(err => console.log("Erreurs lors de la création des cursus: ", err)); */

// part 2 - associer un cursus à chaque étudiant
// --------------------------------------------------------

// J'ai choisi de créer une fonction pour parcourir chaque document de la collection Year et l'assigner à un étudiant dans l'ordre
// Définir une fonction pour parcourir chaque document de la collection Year et l'assigner à un étudiant dans l'ordre
async function assignYearToStudents() {
    try {
        // Récupérer tous les étudiants
        const students = await Student.find();
        
        // Récupérer tous les documents de la collection Year
        const years = await Year.find();
        
        // Parcourir chaque document de la collection Year
        for (let i = 0; i < years.length; i++) {
            // Vérifier si nous avons parcouru tous les étudiants
            if (i >= students.length) {
                console.log("Tous les étudiants ont été assignés.");
                break;
            }

            // Récupérer l'étudiant correspondant à l'index actuel  
            const student = students[i];

            // Assigner le document Year à l'étudiant actuel
            student.year = years[i]._id;

            // Sauvegarder les modifications de l'étudiant
            await student.save();
        }

        console.log("Assignation des documents Year aux étudiants terminée.");
    } catch (error) {
        console.error("Une erreur est survenue :", error);
    }
}

// Appeler la fonction pour assigner chaque document de la collection Year à un étudiant dans l'ordre
assignYearToStudents();


  
