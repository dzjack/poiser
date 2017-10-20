const service = require('feathers-objection')
const MenuModel = require('../models').Menu

module.exports = service({
  model: MenuModel
})
