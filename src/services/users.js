const service = require('feathers-objection')
const UserModel = require('../models').User

module.exports = service({
  model: UserModel,
  allowedEager: '[userIntolerances]'
})
