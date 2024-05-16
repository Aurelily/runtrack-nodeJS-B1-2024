const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// READ :  Route pour récupérer tous les étudiants
router.get('/etudiants', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ : Route pour récupérer un étudiant par ID
router.get('/etudiant/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Etudiant non trouvé' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE : Route pour ajouter un étudiant
router.post('/etudiants', async (req, res) => {
  const student = new Student(req.body);

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE : Route pour supprimer un étudiant par ID
router.delete('/etudiant/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Etudiant non trouvé' });
    }

    await Student.deleteOne({ _id: req.params.id });
    res.json({ message: 'Etudiant supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE : Route pour mettre à jour un étudiant par ID
router.put('/etudiant/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true renvoie le document mis à jour, runValidators: true exécute les validateurs du schéma
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Etudiant non trouvé' });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
