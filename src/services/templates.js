const service = require('feathers-objection')
const TemplateModel = require('../models').Template

module.exports = service({
  model: TemplateModel
})
