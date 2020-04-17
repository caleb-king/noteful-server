const notesService = {
  getAllNotes(knex) {
    return knex.select('*').from('notes');
  },
  preprocessNote(note) {
    return {
      id: note.id.toString(),
      name: note.note_name,
      modified: note.modified,
      folderId: note.folder_id.toString(),
      content: note.content
    };
  }
};

module.exports = notesService;