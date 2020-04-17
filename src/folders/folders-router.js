const express = require('express');
const foldersService = require('./folders-service');

const foldersRouter = express.Router();
const jsonParser = express.json();

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    foldersService.getAllFolders(knexInstance)
      .then((folders) => {
        const renamedFolders = folders.map(foldersService.preprocessFolder);
        res.json(renamedFolders);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    res.send('Created a new folder');
  });

foldersRouter
  .route('/:folder_id')
  .delete((req, res, next) => {
    res.send('Deleted folder');
  });

module.exports = foldersRouter;