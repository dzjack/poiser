const service = require('feathers-objection')
const MealPreferenceModel = require('../models').MealPreference

module.exports = service({
  model: MealPreferenceModel
})
