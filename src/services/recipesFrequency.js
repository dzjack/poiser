const service = require('feathers-objection')
const RecipeFrequencyModel = require('../models').RecipeFrequency

module.exports = service({
  model: RecipeFrequencyModel
})
