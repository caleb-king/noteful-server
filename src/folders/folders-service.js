const foldersService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders');
  },
  preprocessFolder(folder) {
    return {
      id: folder.id.toString(),
      name: folder.folder_name
    };
  }
};

module.exports = foldersService;