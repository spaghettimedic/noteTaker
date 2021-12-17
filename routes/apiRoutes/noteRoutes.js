const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const router = require('express').Router();
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
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
  const id = deleteNote(req.params.id, notes);
  res.json(id);
});

module.exports = router;
