require('dotenv').config()
const app = require('../app')
const recipes = require('./recipes')
const users = require('./users')
const mealTypes = require('./mealTypes')
const mealPreferences = require('./mealPreferences')
const templates = require('./templates')

async function seed() {
  await createMealTypes()
  await createTemplates()
  await createMealPreferences()
  const recipes = await createRecipes()
  const [miguel] = await createUsers(users)
  await recipesFrequency(recipes, miguel)
}

async function createTemplates() {
  const templatesService = app.service('templates')
  return Promise.all(
    templates.map(template => templatesService.create(template))
  )
}

async function createMealPreferences() {
  const mealPreferencesService = app.service('mealPreferences')
  return Promise.all(
    mealPreferences.map(mealPreference =>
      mealPreferencesService.create({ name: mealPreference })
    )
  )
}

async function createMealTypes() {
  const mealTypesService = app.service('mealTypes')
  return Promise.all(
    mealTypes.map(mealType => mealTypesService.create({ name: mealType }))
  )
}

async function createRecipes(user) {
  const recipeService = app.service('recipes')
  const recipesFrequencyService = app.service('recipesFrequency')
  return Promise.all(
    recipes.map(async function(recipe) {
      try {
        const ingredientIds = await createIngredients(recipe.ingredients)
        return await recipeService.create(recipe)
      } catch (e) {
        console.log('error creating recipes', e)
      }
    })
  )
}

async function recipesFrequency(recipes, user) {
  const recipesFrequencyService = app.service('recipesFrequency')
  return Promise.all(
    recipes.map(async function(recipe) {
      try {
        return await recipesFrequencyService.create({
          recipeId: recipe.id,
          userId: user.id
        })
      } catch (e) {
        console.log('error creating recipe frequency', e)
      }
    })
  )
}

async function createIngredients(ingredients) {
  const ingredientsService = app.service('ingredients')
  return Promise.all(
    ingredients.map(function(ingredient) {
      return ingredientsService.create({ name: ingredient })
    })
  )
}

async function createUsers(users) {
  const userService = app.service('users')
  return Promise.all(
    users.map(function(user) {
      return userService.create(user)
    })
  )
}

module.exports = seed
