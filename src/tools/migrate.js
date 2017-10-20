/* eslint-disable no-console */
require('dotenv').config()
const knex = require('../knex')
const initializeDB = require('../db')
const seed = require('./seed')
initializeDB(knex)
  .then(seed)
  .then(() => {
    console.log('DB initialization and seed done!')
    process.exit(0)
  })
  .catch(error => {
    console.log('Seed failed', error)
    process.exit(-1)
  })
