const express = require('express');
const notesService = require('./notes-service');

const notesRouter = express.Router();
const jsonParser = express.json();

notesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    notesService.getAllNotes(knexInstance)
      .then(notes => {
        const renamedNotes = notes.map(notesService.preprocessNote);
        res.json(renamedNotes);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    res.send('Created a new note');
  });

notesRouter
  .route('/:note_id')
  .delete((req, res, next) => {
    res.send('Deleted note');
  });


module.exports = notesRouter;