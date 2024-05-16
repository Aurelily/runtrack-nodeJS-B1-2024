
// import de Mongoose
const mongoose = require('mongoose');


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

// Initialisation des schemas dans des variables
const Student = mongoose.model('Student', studentSchema, 'student');
module.exports = Student;