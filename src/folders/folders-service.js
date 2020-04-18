const foldersService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders');
  },
  prepareFolderForClient(folder) {
    return {
      id: folder.id.toString(),
      name: folder.folder_name
    };
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('folders')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
};

module.exports = foldersService;