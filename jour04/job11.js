// import de Mongoose
const mongoose = require('mongoose');

// Import du module fs pour écrire le fichier students.json
const fs = require('fs');

// Connexion à la BDD

mongoose.connect('mongodb://localhost:27017/LaPlateforme', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(err => console.error('Erreur lors de la connexion à la base de données:', err));

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


// Fonction pour exporter les données de la collection Student dans un fichier JSON
// NOTE : La méthode lean() est utilisée pour convertir les documents Mongoose en objets JavaScript purs, ce qui est plus efficace pour l'exportation.
// NOTE 2 : Utilisation de JSON.stringify avec une indentation de 2 espaces pour rendre le fichier JSON lisible.
async function exportStudentsToJSON() {
    try {
      const students = await Student.find().populate('year_id').lean();
      const jsonContent = JSON.stringify(students, null, 2);
  
      fs.writeFile('students.json', jsonContent, 'utf8', (err) => {
        if (err) {
          console.error('Erreur lors de l\'écriture du fichier JSON:', err);
        } else {
          console.log('Données des étudiants exportées avec succès dans students.json');
        }
        mongoose.connection.close();
      });
    } catch (error) {
      console.error('Une erreur est survenue :', error);
      mongoose.connection.close();
    }
  }
  
  // Exécution de la fonction d'exportation
  exportStudentsToJSON();


