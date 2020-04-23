const express = require('express');
const notesService = require('./notes-service');
const xss = require('xss');

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = note => ({
  id: note.id,
  name: xss(note.name),
  modified: note.modified,
  folderId: note.folderId,
  content: xss(note.content)
});

notesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    notesService.getAllNotes(knexInstance)
      .then(notes => {
        const renamedNotes = notes.map(notesService.prepareNoteForClient);
        res.json(renamedNotes.map(serializeNote));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newNote = {
      note_name: req.body.name,
      folder_id: Number(req.body.folderId),
      content: req.body.content
    };
    notesService.insertNote(knexInstance, newNote)
      .then(note => {
        const responseNote = notesService.prepareNoteForClient(note);
        res
          .status(201)
          .json(serializeNote(responseNote));
      })
      .catch(next);
  });

notesRouter
  .route('/:note_id')
  .delete((req, res, next) => {
    const knexInstance = req.app.get('db');
    const id = req.params.note_id;
    notesService.deleteNote(knexInstance, id)
      .then(() => {
        res
          .status(200)
          .end();
      })
      .catch(next);
  });


module.exports = notesRouter;