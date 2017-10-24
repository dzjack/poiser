const service = require('feathers-objection')
const UserIntolerancesModel = require('../models').UserIntolerance

module.exports = service({
  model: UserIntolerancesModel
})
