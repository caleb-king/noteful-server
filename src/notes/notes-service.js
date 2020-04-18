const notesService = {
  getAllNotes(knex) {
    return knex.select('*').from('notes');
  },
  prepareNoteForClient(note) {
    return {
      id: note.id.toString(),
      name: note.note_name,
      modified: note.modified,
      folderId: note.folder_id.toString(),
      content: note.content
    };
  },
  insertNote(knex, newNote) {
    return knex
      .insert(newNote)
      .into('notes')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteNote(knex, id) {
    return knex
      .from('notes')
      .where({ id })
      .delete();
  }
};

module.exports = notesService;