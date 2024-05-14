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

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    year_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        required: true
    },
    student_number: {
        type: Number,
        unique: true,
        required: true
    }
});

const yearSchema = new mongoose.Schema({
    year: String,
})

// Initialisation des schemas dans des variables
const Student = mongoose.model('Student', studentSchema, 'student');
const Year = mongoose.model('Year', yearSchema, 'year');



// Fonction pour demander l'ID de l'étudiant à l'utilisateur
function askStudentId() {
    return new Promise((resolve, reject) => {
      myInterface.question('Veuillez saisir l\'ID de l\'étudiant : ', (answer) => {
        resolve(answer.trim());
      });
    });
  }
  
  // Fonction pour demander l'ID du nouveau cursus à l'utilisateur
  function askYearId() {
    return new Promise((resolve, reject) => {
      myInterface.question('Veuillez saisir l\'ID du nouveau cursus : ', (answer) => {
        resolve(answer.trim());
      });
    });
  }
  
  // Fonction principale pour mettre à jour le cursus d'un étudiant
  async function updateStudentYear() {
    try {
      const studentId = await askStudentId();
      const yearId = await askYearId();
  
      // Requête pour mettre à jour le cursus de l'étudiant
      const result = await Student.findByIdAndUpdate(studentId, { year_id: yearId }, { new: true });
  
      if (result) {
        console.log('Cursus de l\'étudiant mis à jour avec succès :', result);
        // Requête pour récupérer l'ensemble des étudiants avec leurs cursus
        const studentsList = await Student.find().populate('year_id');

        // Afficher la liste mise à jour dans la console
        if(studentsList){
            console.log("Liste des étudiants avec leurs cursus :");
            studentsList.forEach(student => {
                console.log(`${student.firstname} ${student.lastname} - Cursus: ${student.year_id.year}`);
            });
        }
      } else {
        console.log('Aucun étudiant trouvé avec l\'ID fourni.');
      }
    } catch (error) {
      console.error('Une erreur est survenue :', error);
    } finally {
      myInterface.close();
      mongoose.connection.close();
    }
  }
  
  // Exécution de la fonction principale
  updateStudentYear();


