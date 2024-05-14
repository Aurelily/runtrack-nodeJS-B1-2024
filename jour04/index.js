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



// Fonction pour demander le nom de famille à l'utilisateur
function askLastName() {
    return new Promise((resolve, reject) => {
      myInterface.question('Veuillez saisir un nom de famille : ', (answer) => {
        if (answer.trim()) {
          resolve(answer.trim());
        } else {
          console.log('Veuillez saisir un nom de famille valide.');
          askLastName().then(resolve).catch(reject);
        }
      });
    });
  }

  
 // Fonction principale pour rechercher un étudiant par nom de famille
async function findStudentByLastName() {
    try {
      const lastName = await askLastName();
      console.log('Nom de famille saisi :', lastName);
  
      // Requête pour trouver l'étudiant avec le nom de famille saisi
      const students = await Student.find({ lastname: lastName }).populate('year_id');
  
      // Afficher les résultats
      if (students.length > 0) {
        console.log('Informations des étudiants avec le nom de famille', lastName, ':');
        students.forEach(student => {
          console.log(`Prénom: ${student.firstname}, Nom: ${student.lastname}, Numéro d'étudiant: ${student.student_number}, Cursus: ${student.year_id.year}`);
        });
      } else {
        console.log('Aucun étudiant trouvé avec le nom de famille', lastName);
      }
    } catch (error) {
      console.error('Une erreur est survenue :', error);
    } finally {
      myInterface.close();
      mongoose.connection.close();
    }
  }
  
  // Exécution de la fonction principale
  findStudentByLastName();
