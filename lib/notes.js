const fs = require("fs");
const path = require("path");

function createNewNote(body, notesArray) {
  let newNote = body;
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray));
};

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
};

function deleteNote(query, notesArray) {
  notesArray = notesArray.filter(note => note.id !== query.id);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray));
};

module.exports = {
  createNewNote,
  validateNote,
  deleteNote
}
