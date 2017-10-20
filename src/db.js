module.exports = function(knex) {
  return knex.schema
    .dropTableIfExists('recipeIngredient')
    .dropTableIfExists('recipeFrequency')
    .dropTableIfExists('recipeMealType')
    .dropTableIfExists('userIntolerance')
    .dropTableIfExists('userMealPreference')
    .dropTableIfExists('mealPreference')
    .dropTableIfExists('mealType')
    .dropTableIfExists('template')
    .dropTableIfExists('menu')
    .dropTableIfExists('ingredient')
    .dropTableIfExists('recipe')
    .dropTableIfExists('user')
    .then(function() {
      return Promise.all([
        knex.schema.createTable('ingredient', function(table) {
          table.increments('id')
          table.string('name')
        }),
        knex.schema.createTable('recipe', function(table) {
          table.increments('id')
          table.string('name')
          table.integer('cookingTime')
          table.string('description')
          table.string('steps')
        }),
        knex.schema.createTable('mealType', function(table) {
          table.increments('id')
          table.string('name')
        }),
        knex.schema.createTable('user', function(table) {
          table.increments('id')
          table.string('email').unique()
          table.string('password')
          table.integer('cookingTime')
        }),
        knex.schema.createTable('mealPreference', function(table) {
          table.increments('id')
          table.string('name')
        }),
        knex.schema.createTable('template', function(table) {
          table.increments('id')
          table.string('name')
          table.integer('mondayLunchId')
          table.foreign('mondayLunchId').references('mealType.id')
          table.integer('mondayDinnerId')
          table.foreign('mondayDinnerId').references('mealType.id')
          table.integer('tuesdayLunchId')
          table.foreign('tuesdayLunchId').references('mealType.id')
          table.integer('tuesdayDinnerId')
          table.foreign('tuesdayDinnerId').references('mealType.id')
          table.integer('wednesdayLunchId')
          table.foreign('wednesdayLunchId').references('mealType.id')
          table.integer('wednesdayDinnerId')
          table.foreign('wednesdayDinnerId').references('mealType.id')
          table.integer('thursdayLunchId')
          table.foreign('thursdayLunchId').references('mealType.id')
          table.integer('thursdayDinnerId')
          table.foreign('thursdayDinnerId').references('mealType.id')
          table.integer('fridayLunchId')
          table.foreign('fridayLunchId').references('mealType.id')
          table.integer('fridayDinnerId')
          table.foreign('fridayDinnerId').references('mealType.id')
        }),
        knex.schema.createTable('recipeFrequency', function(table) {
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('recipeId')
          table.foreign('recipeId').references('recipe.id')
          table.integer('frequency').defaultTo(5)
        }),
        knex.schema.createTable('userIntolerance', function(table) {
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('ingredientId')
          table.foreign('ingredientId').references('ingredient.id')
        }),
        knex.schema.createTable('userMealPreference', function(table) {
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('mealPreferenceId')
          table.foreign('mealPreferenceId').references('mealPreference.id')
        }),
        knex.schema.createTable('recipeIngredient', function(table) {
          table.integer('recipeId').unsigned()
          table.foreign('recipeId').references('recipe.id')
          table.integer('ingredientId').unsigned()
          table.foreign('ingredientId').references('ingredient.id')
        }),
        knex.schema.createTable('recipeMealType', function(table) {
          table.integer('recipeId')
          table.foreign('recipeId').references('recipe.id')
          table.integer('mealTypeId')
          table.foreign('mealTypeId').references('mealType.id')
        }),
        knex.schema.createTable('menu', function(table) {
          table.integer('id')
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('mondayLunchId')
          table.foreign('mondayLunchId').references('recipe.id')
          table.integer('mondayDinnerId')
          table.foreign('mondayDinnerId').references('recipe.id')
          table.integer('tuesdayLunchId')
          table.foreign('tuesdayLunchId').references('recipe.id')
          table.integer('tuesdayDinnerId')
          table.foreign('tuesdayDinnerId').references('recipe.id')
          table.integer('wednesdayLunchId')
          table.foreign('wednesdayLunchId').references('recipe.id')
          table.integer('wednesdayDinnerId')
          table.foreign('wednesdayDinnerId').references('recipe.id')
          table.integer('thursdayLunchId')
          table.foreign('thursdayLunchId').references('recipe.id')
          table.integer('thursdayDinnerId')
          table.foreign('thursdayDinnerId').references('recipe.id')
          table.integer('fridayLunchId')
          table.foreign('fridayLunchId').references('recipe.id')
          table.integer('fridayDinnerId')
          table.foreign('fridayDinnerId').references('recipe.id')
        })
      ])
    })
}
