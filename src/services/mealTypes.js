const service = require('feathers-objection')
const MealTypeModel = require('../models').MealType

module.exports = service({
  model: MealTypeModel
})
