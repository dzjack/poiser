const Model = require('objection').Model
const knex = require('../knex')
const Users = require('./users')
const Menus = require('./menus')
const Templates = require('./templates')
const Recipes = require('./recipes')
const Ingredients = require('./ingredients')

module.exports = function() {
  const app = this // eslint-disable-line no-unused-vars
  Model.knex(knex)

  app.use('ingredients', Ingredients)
  app.use('recipies', Recipes)
  app.use('templates', Templates)
  app.use('menus', Menus)
  app.use('users', Users)
}
