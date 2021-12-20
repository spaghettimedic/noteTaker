const express = require('express');
const router = express.Router();
const path = require('path');
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');

const fs = require('fs');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
  fs.readFile(
    path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
      let notes = JSON.parse(data);
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        res.json(notes);
      }
    }
  );
});

router.post('/notes', (req, res) => {
  // set id based on what the index of the array will be
  req.body.id = uniqid();

  // read all current notes to be passed into createNewNote() function
  fs.readFile(
    path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
      let currentNotes = JSON.parse(data);
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        // if any data in req.body is incorrect, send 400 error back
        if (!validateNote(req.body)) {
          res.status(400).send('The note is not properly formatted.');
        } else {
          // add note to json file and notes array in this function
          let newNote = createNewNote(req.body, currentNotes);
          res.json(newNote);
        }
      }
    }
  );
});

router.delete('/notes/:id', (req, res) => {
  // read all current notes to be passed into deleteNote() function
  fs.readFile(
    path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
      let currentNotes = JSON.parse(data);
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        let updatedNotes = deleteNote(req.params, currentNotes);
        res.json(updatedNotes);
      }
    }
  );
});

module.exports = router;
