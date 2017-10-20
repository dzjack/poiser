const service = require('feathers-objection')
const RecipeModel = require('../models').Recipe

module.exports = service({
  model: RecipeModel
})
