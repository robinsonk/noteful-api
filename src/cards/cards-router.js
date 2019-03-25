const path = require('path')
const express = require('express')
const xss = require('xss')
const cardsService = require('./cards-service')

const cardsRouter = express.Router()
const jsonParser = express.json()

cardsRouter
    .route('/')
    .get((req, res, next) => {
        CardsService.getAllCards(
            req.app.get('db')
        )
            .then(cards => {
                res.json(cards)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { title, folder_id, content } = req.body
        const newCard = { title }

        for (const [key, value] of Object.entries(newCard)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        CardsService.insertCard(
            req.app.get('db'),
            newCard
        )
            .then(card => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${card.id}`))
                    .json(card)
            })
            .catch(next)
    })

cardsRouter
    .route('/:card_id')
    .all((req, res, next) => {
        CardsService.getById(
            req.app.get('db'),
            req.params.card_id
        )
            .then(card => {
                if (!card) {
                    return res.status(404).json({
                        error: { message: `Card doesn't exist` }
                    })
                }
                res.card = card // save the card for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json(serializeCard(res.card))
    })

    .delete((req, res, next) => {
        CardsService.deleteCard(
            req.app.get('db'),
            req.params.card_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { title, folder_id, content } = req.body
        const cardToUpdate = { title, folder_id, content }

        const numberOfValues = Object.values(cardToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain a title, folder, and content`
                }
            })
        }


        CardsService.updateCard(
            req.app.get('db'),
            req.params.card_id,
            cardToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = cardsRouter