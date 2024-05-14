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



// Part 1 - Fonction pour parcourir chaque document de la collection Student et assigner à chaque etudiant un numéro (entier entre 1 et 4 chiffres random)
async function assignNumberToStudents() {

    try {
        // Récupérer tous les étudiants
        const students = await Student.find();

        
        // Parcourir chaque document de la collection Student
        for (let i = 0; i < students.length; i++) {
            // Vérifier si nous avons parcouru tous les étudiants
            if (i >= students.length) {
                console.log("Tous les étudiants ont été assignés.");
                break;
            }

            // Récupérer l'étudiant correspondant à l'index actuel  
            const student = students[i];

            // Assigner un numéro étudiant à l'étudiant actuel (entier entre 1 et 4 chiffres random)
            student.student_number = Math.floor(Math.random() * 10000);

            // Sauvegarder les modifications de l'étudiant
            await student.save();
        }

        console.log("Assignation des numéros étudiant terminée.");
    } catch (error) {
        console.error("Une erreur est survenue :", error);
    }
}

// Part 2 - Requête pour de filtrer les étudiants ayant un numéro d’étudiant plus grand que celui saisi par l’utilisateur
// Nous utilisons le module readline pour créer une interface de lecture/écriture pour la console.

// Création d'une fonction pour demander à l'utilisateur de saisir un numéro d'étudiant
function askStudentNumber() {
    return new Promise((resolve, reject) => {
        myInterface.question('Veuillez saisir un numéro d\'étudiant (entre 1 et 4 chiffres) : ', (answer) => {
        const studentNumber = parseInt(answer);
        if (!Number.isNaN(studentNumber) && studentNumber >= 1 && studentNumber <= 9999) {
          resolve(studentNumber);
        } else {
          console.log('Veuillez saisir un numéro d\'étudiant valide (entre 1 et 4 chiffres).');
          askStudentNumber().then(resolve).catch(reject);
        }
      });
    });
  }

// Fonction principale pour filtrer les étudiants
async function filterStudents() {
    try {
      const studentNumber = await askStudentNumber();
      console.log('Numéro d\'étudiant saisi :', studentNumber);
  
      // Requête pour filtrer les étudiants avec un numéro d'étudiant supérieur à celui saisi
      const students = await Student.find({ student_number: { $gt: studentNumber } }).populate('year_id');
  
      // Afficher les résultats
      if (students.length > 0) {
        console.log('Étudiants avec un numéro d\'étudiant supérieur à', studentNumber, ':');
        students.forEach(student => {
          console.log(`${student.firstname} ${student.lastname} - Numéro d'étudiant: ${student.student_number}, Cursus: ${student.year_id.year}`);
        });
      } else {
        console.log('Aucun étudiant trouvé avec un numéro d\'étudiant supérieur à', studentNumber);
      }
    } catch (error) {
      console.error('Une erreur est survenue :', error);
    } finally {
      myInterface.close();
      mongoose.connection.close();
    }
  }

  // Exécution de la fonction principale
filterStudents();
  
 
