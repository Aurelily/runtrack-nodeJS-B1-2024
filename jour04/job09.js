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
  
// Fonction principale pour supprimer un étudiant
async function deleteStudent() {
    try {
      const studentId = await askStudentId();
  
      // Requête pour supprimer l'étudiant par son ID
      const result = await Student.findByIdAndDelete(studentId);
  
      if (result) {
        console.log('Étudiant supprimé avec succès :', result);
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
  deleteStudent();


