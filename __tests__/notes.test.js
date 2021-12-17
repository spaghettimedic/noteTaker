const fs = require('fs');
const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../lib/notes');
const { notes } = require('../db/db.json');

test("creates a note object", () => {
  const note = createNewNote(
    { title: "title example", text: "text example", id: "aisdufhqq89w73" },
    notes
  );

  expect(note.title).toBe("title example");
  expect(note.text).toBe("text example");
  expect(note.id).toBe("aisdufhqq89w73");
});

test("filters by query", () => {
  const startingNotes = [
    {
      title: "note 1",
      text: "note 1 text example",
      id: "asdf1234"
    },
    {
      title: "note 2",
      text: "note 2 text example",
      id: "lkj0987"
    },
    {
      title: "note 3",
      text: "note 3 text example",
      id: "poiu653"
    }
  ];

  const updatedNotes = filterByQuery({ title: "note 3" }, startingNotes);

  expect(updatedNotes.length).toEqual(1);
});

test("finds by id", () => {
  const startingNotes = [
    {
      title: "note 1",
      text: "note 1 text example",
      id: "asdf1234"
    },
    {
      title: "note 2",
      text: "note 2 text example",
      id: "lkj0987"
    },
    {
      title: "note 3",
      text: "note 3 text example",
      id: "poiu653"
    }
  ];

  const result = findById("lkj0987", startingNotes);

  expect(result.title).toBe("note 2");
});

test("validates new notes", () => {
  const note = {
    title: "note 1",
    text: "note 1 text example",
    id: "asdf1234"
  };

  const invalidNote = {
    title: "note 1",
    id: "asdf1234"
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});

test("deletes a note object", () => {
  const startingNotes = [
    {
      title: "note 1",
      text: "note 1 text example",
      id: "asdf1234"
    },
    {
      title: "note 2",
      text: "note 2 text example",
      id: "lkj0987"
    },
    {
      title: "note 3",
      text: "note 3 text example",
      id: "poiu653"
    }
  ];
  
  const updatedNotes = [
    {
      title: "note 2",
      text: "note 2 text example",
      id: "lkj0987"
    },
    {
      title: "note 3",
      text: "note 3 text example",
      id: "poiu653"
    }
  ];

  const result = deleteNote({ title: "note 1", text: "note 1 text example", id: "asdf1234" }, startingNotes);
  
  expect(result).toStrictEqual(updatedNotes);
});
