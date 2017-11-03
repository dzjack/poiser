const service = require('feathers-objection')
const MenuModel = require('../models').Menu
const RecipeModel = require('../models').Recipe

module.exports = service({
  model: MenuModel
}).extend({
  setup(app) {
    this.app = app
  },
  async create(params) {
    const user = await this.app.service('users').get(params.userId || 1)
    const intolerances = user.intolerances.map(i => i.name)
    const lunchs = RecipeModel.query()
      // Filtro por receta
      .where('cookingTime', '<', user.cookingTime)
      // Filtro por ingredientes
      .joinRelation('ingredients')
      .whereNotIn('ingredients.name', intolerances)
      // Filtro por mealtype
      .joinRelation('template.mondayLunch as mealType')
      .where('mealType.name', '=', 'recipe.mealType')
      .where('template.')
      .groupBy('recipe.id')
    return await lunchs
  }
})
