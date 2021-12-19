const express = require('express');
const router = express.Router();
const path = require('path');
const { findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');

const fs = require('fs');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
  fs.readFile((__dirname, './db/db.json'), (err, notes) => {
    const result = JSON.stringify({ notes });
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.json(result);
    }
  });
});

router.get('/notes/:id', (req, res) => {
  const notes = fs.readFile(path.join(__dirname, './db/db'));
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post('/notes', (req, res) => {
  // set id based on what the index of the array will be
  req.body.id = uniqid();

  const notes = fs.readFile(path.join(__dirname, './db/db'));

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete('/notes/:id', (req, res) => {
  const notes = fs.readFile(path.join(__dirname, './db/db'));
  const id = deleteNote(req.params.id, notes);
  res.json(id);
});

module.exports = router;
