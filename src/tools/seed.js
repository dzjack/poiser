require('dotenv').config()
const app = require('../app')
const ingredients = require('./ingredients')

async function seed() {
  const [miguel] = await createUsers()
  await createIngredients()
  const [pastaAloPobre] = await createRecipes()
}

async function createRecipe() {
  const recipeService = app.service('recipes')
  recipeService.create({
    name: 'pasta a lo pobre',
    cookingTime: 20,
    description: 'Un plato perfecto para cuando no tienes nada en la nevera',
    steps: 'paso 1, paso 2...'
  })
}

async function createIngredients() {
  const ingredientsService = app.service('ingredients')
  ingredients.forEach(ingredient =>
    ingredientsService.create({ name: ingredient })
  )
  await ingredientsService.create({ name: 'agua' })
}

async function createUsers() {
  const userService = app.service('users')
  const miguel = await userService.create({
    email: 'miguel@redradix.com',
    password: 'redradix',
    cookingTime: 15
  })
  return [miguel]
}

module.exports = seed
