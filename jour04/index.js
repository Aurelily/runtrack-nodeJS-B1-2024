// import de Mongoose
const mongoose = require('mongoose');

// Import du module readline pour créer une interface console de demande utilisateur:

const readline = require('readline');

// Je crée mon interface de prompt :

const myInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connexion à la BDD

mongoose.connect('mongodb://localhost:27017/LaPlateforme');

// Création des schemas
// Ajout de contraintes de vérifications :
// - firstname et lastname doivent être des chaînes de caractères non vides.
// - year_id doit être un ObjectId valide faisant référence à un document dans la collection Year.
// - student_number doit être un nombre entier unique, obligatoire, et compris entre 1 et 9999.

const studentSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: [true, 'Le prénom est obligatoire.'],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, 'Le nom de famille est obligatoire.'],
      trim: true
    },
    year_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Year',
      required: [true, 'L\'ID du cursus est obligatoire.']
    },
    student_number: {
      type: Number,
      unique: true,
      required: [true, 'Le numéro d\'étudiant est obligatoire.'],
      min: [1, 'Le numéro d\'étudiant doit être compris entre 1 et 9999.'],
      max: [9999, 'Le numéro d\'étudiant doit être compris entre 1 et 9999.']
    }
  });

  // Ajout de contraintes de vérifications :
  // year doit être une chaîne de caractères non vide et unique (si nécessaire).
  const yearSchema = new mongoose.Schema({
    year: {
      type: String,
      required: [true, 'Le nom du cursus est obligatoire.'],
      unique: true,
      trim: true
    }
  });

// Initialisation des schemas dans des variables
const Student = mongoose.model('Student', studentSchema, 'student');
const Year = mongoose.model('Year', yearSchema, 'year');


// TESTER : Creation de nouveaux étudiants

Student.create([
    { firstname: "a", lastname: "zz", year_id: "6641f9c49fd78806b18e6e63", student_number: 345}])
  .then(users => console.log("Étudiants créés:", users))
  .catch(err => console.log("Erreurs lors de la création des étudiants: ", err));
  


