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
        const renamedFolders = folders.map(foldersService.prepareFolderForClient);
        res.json(renamedFolders);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newFolder = { folder_name: req.body.name };
    foldersService.insertFolder(knexInstance, newFolder)
      .then(folder => {
        const responseFolder = foldersService.prepareFolderForClient(folder);
        res
          .status(201)
          .json(responseFolder);
      })
      .catch(next);
  });

foldersRouter
  .route('/:folder_id')
  .delete((req, res, next) => {
    res.send('Deleted folder');
  });

module.exports = foldersRouter;