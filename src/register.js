/* eslint-disable */
/* the line above disables eslint check for this file (temporarily) todo:delete */
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection options with authentication
//const dbURI = 'mongodb+srv://talsinay:tesla730@talsinay.qzozm.mongodb.net/?authMechanism=DEFAULT';
const dbURI = 'mongodb+srv://talsinay:tesla730@talsinay.qzozm.mongodb.net/?retryWrites=true&w=majority"';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const studentSchema = new mongoose.Schema({
  name: String,
  exam1: Number,
  exam2: Number,
  exam3: Number,
});

const Student = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(`
        <h1 style='color: blue'>Register Page</h1>
        <form action="/register" method="POST">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" required><br>
          <label for="exam1">Exam 1:</label>
          <input type="number" name="exam1" id="exam1" required><br>
          <label for="exam2">Exam 2:</label>
          <input type="number" name="exam2" id="exam2" required><br>
          <label for="exam3">Exam 3:</label>
          <input type="number" name="exam3" id="exam3" required><br>
          <button type="submit">Submit</button>
        </form>
        <h1 style='color: blue'>Students</h1>
        <ul>
          ${students.map(student => `<li>${student.name} - Exam 1: ${student.exam1}, Exam 2: ${student.exam2}, Exam 3: ${student.exam3}</li>`).join('')}
        </ul>
      `);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data.');
  }
});

router.post('/', async (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body;
  const student = new Student({
    name,
    exam1: parseInt(exam1),
    exam2: parseInt(exam2),
    exam3: parseInt(exam3),
  });

  try {
    await student.save();
    res.redirect('/register');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving data.');
  }
});

module.exports = router;
