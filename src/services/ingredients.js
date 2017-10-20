const service = require('feathers-objection')
const IngredientModel = require('../models').Ingredient

module.exports = service({
  model: IngredientModel
})
