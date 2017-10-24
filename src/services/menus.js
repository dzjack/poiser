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
    const user = await this.app
      .service('users')
      .get(params.userId || 1, { query: {} })
    console.log('user', user)
    const lunchsQuery = RecipeModel.query()
      // Filtro por receta
      //.where('cookingTime', '<', user.cookingTime)
      // Filtro por ingredientes
      .join('recipeIngredients')
      .whereNotIn('recipeIngredient.ingredientName', user.userIntolerances)
    console.log('query', lunchsQuery.toString())
    const lunchs = await lunchsQuery
    console.log('mondayRecipe', mondayRecipe)
  }
})
