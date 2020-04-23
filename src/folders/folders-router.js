const express = require('express');
const foldersService = require('./folders-service');
const xss = require('xss');

const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = folder => ({
  id: folder.id,
  name: xss(folder.name)
});

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    foldersService.getAllFolders(knexInstance)
      .then((folders) => {
        const renamedFolders = folders.map(foldersService.prepareFolderForClient);
        res.json(renamedFolders.map(serializeFolder));
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
          .json(serializeFolder(responseFolder));
      })
      .catch(next);
  });

foldersRouter
  .route('/:folder_id')
  .delete((req, res, next) => {
    res.send('Deleted folder');
  });

module.exports = foldersRouter;