const knex = require('knex')
const app = require('./app')
require('dotenv').config()

const { PORT, DB_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server is now listening at http://localhost:${PORT}`)
})