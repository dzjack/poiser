const Model = require('objection').Model
const knex = require('../knex')
const Users = require('./users')
const UserIntolerances = require('./userIntolerances')
const Menus = require('./menus')
const Templates = require('./templates')
const Recipes = require('./recipes')
const RecipesFrequency = require('./recipesFrequency')
const Ingredients = require('./ingredients')
const MealTypes = require('./mealTypes')
const MealPreferences = require('./mealPreferences')
const userHooks = require('../hooks/userHooks')

module.exports = function() {
  const app = this // eslint-disable-line no-unused-vars
  Model.knex(knex)

  app.use('ingredients', Ingredients)
  app.use('mealTypes', MealTypes)
  app.use('mealPreferences', MealPreferences)
  app.use('recipes', Recipes)
  app.use('recipesFrequency', RecipesFrequency)
  app.use('templates', Templates)
  app.use('users', Users)
  app.use('userIntolerances', UserIntolerances)
  app.use('menus', Menus)
  app.service('users').hooks(userHooks)
}
