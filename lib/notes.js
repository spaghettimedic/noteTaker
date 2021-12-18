const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  return filteredResults;
};

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
};

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
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
  const id = query.id;
  let updatedNotesArray = notesArray;
  if (id) {
    updatedNotesArray = updatedNotesArray.filter(note => note.id !== id);
  }

  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: updatedNotesArray }, null, 2)
  );

  notesArray = updatedNotesArray;
  return updatedNotesArray;
};

module.exports = {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  deleteNote
}
