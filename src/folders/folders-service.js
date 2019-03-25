const FoldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('blogful_folders')
    },
    insertFolder(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('blogful_folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('blogful_folders').select('*').where('id', id).first()
    },
    deleteFolder(knex, id) {
        return knex('blogful_folders')
            .where({ id })
            .delete()
    },
    updateFolder(knex, id, newFolderFields) {
        return knex('blogful_folders')
            .where({ id })
            .update(newFolderFields)
    },
}

module.exports = FoldersService