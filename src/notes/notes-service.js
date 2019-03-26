const NotesService = {
    getAllNotes(knex) {
        return knex.select('*').from('noteful_cards')
    },
    insertNote(knex, newNote) {
        return knex
            .insert(newNote)
            .into('noteful_cards')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('noteful_cards').select('*').where('id', id).first()
    },
    deleteNote(knex, id) {
        return knex('noteful_cards')
            .where({ id })
            .delete()
    },
    updateNote(knex, id, newNoteFields) {
        return knex('noteful_cards')
            .where({ id })
            .update(newNoteFields)
    },
}

module.exports = NotesService