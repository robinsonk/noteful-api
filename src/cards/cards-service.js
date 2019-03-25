const CardsService = {
    getAllCards(knex) {
        return knex.select('*').from('blogful_cards')
    },
    insertCard(knex, newCard) {
        return knex
            .insert(newCard)
            .into('blogful_cards')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('blogful_cards').select('*').where('id', id).first()
    },
    deleteCard(knex, id) {
        return knex('blogful_cards')
            .where({ id })
            .delete()
    },
    updateCard(knex, id, newCardFields) {
        return knex('blogful_cards')
            .where({ id })
            .update(newCardFields)
    },
}

module.exports = CardsService