module.exports = function(knex) {
  return knex.schema
    .dropTableIfExists('recipeIngredient')
    .dropTableIfExists('recipeFrequency')
    .dropTableIfExists('recipeMealType')
    .dropTableIfExists('userIntolerance')
    .dropTableIfExists('ingredientAvoid')
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
          table.string('name').unique()
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
          table.string('name').unique()
        }),
        knex.schema.createTable('user', function(table) {
          table.increments('id')
          table.string('email').unique()
          table.string('password')
          table.integer('cookingTime')
        }),
        knex.schema.createTable('mealPreference', function(table) {
          table.increments('id')
          table.string('name').unique()
        }),
        knex.schema.createTable('template', function(table) {
          table.increments('id')
          table.string('name').unique()
          table.string('mondayLunch')
          table.foreign('mondayLunch').references('mealType.name')
          table.string('mondayDinner')
          table.foreign('mondayDinner').references('mealType.name')
          table.string('tuesdayLunch')
          table.foreign('tuesdayLunch').references('mealType.name')
          table.string('tuesdayDinner')
          table.foreign('tuesdayDinner').references('mealType.name')
          table.string('wednesdayLunch')
          table.foreign('wednesdayLunch').references('mealType.name')
          table.string('wednesdayDinner')
          table.foreign('wednesdayDinner').references('mealType.name')
          table.string('thursdayLunch')
          table.foreign('thursdayLunch').references('mealType.name')
          table.string('thursdayDinner')
          table.foreign('thursdayDinner').references('mealType.name')
          table.string('fridayLunch')
          table.foreign('fridayLunch').references('mealType.name')
          table.string('fridayDinner')
          table.foreign('fridayDinner').references('mealType.name')
        }),
        knex.schema.createTable('recipeFrequency', function(table) {
          table.increments('id')
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('recipeId')
          table.foreign('recipeId').references('recipe.id')
          table.integer('frequency')
          // table.primary(['userId', 'recipeId'])
        }),
        knex.schema.createTable('userIntolerance', function(table) {
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('ingredientName')
          table.foreign('ingredientName').references('ingredient.name')
        }),
        knex.schema.createTable('ingredientAvoid', function(table) {
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('ingredientName')
          table.foreign('ingredientName').references('ingredient.name')
        }),
        knex.schema.createTable('userMealPreference', function(table) {
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.integer('mealPreferenceName')
          table.foreign('mealPreferenceName').references('mealPreference.name')
        }),
        knex.schema.createTable('recipeIngredient', function(table) {
          table.integer('recipeId').unsigned()
          table.foreign('recipeId').references('recipe.id')
          table.integer('ingredientName').unsigned()
          table.foreign('ingredientName').references('ingredient.name')
        }),
        knex.schema.createTable('recipeMealType', function(table) {
          table.integer('recipeId')
          table.foreign('recipeId').references('recipe.id')
          table.integer('mealTypeName')
          table.foreign('mealTypeName').references('mealType.name')
        }),
        knex.schema.createTable('menu', function(table) {
          table.integer('id')
          table.integer('userId')
          table.foreign('userId').references('user.id')
          table.string('mondayLunch')
          table.foreign('mondayLunch').references('recipe.id')
          table.string('mondayDinner')
          table.foreign('mondayDinner').references('recipe.id')
          table.string('tuesdayLunch')
          table.foreign('tuesdayLunch').references('recipe.id')
          table.string('tuesdayDinner')
          table.foreign('tuesdayDinner').references('recipe.id')
          table.string('wednesdayLunch')
          table.foreign('wednesdayLunch').references('recipe.id')
          table.string('wednesdayDinner')
          table.foreign('wednesdayDinner').references('recipe.id')
          table.string('thursdayLunch')
          table.foreign('thursdayLunch').references('recipe.id')
          table.string('thursdayDinner')
          table.foreign('thursdayDinner').references('recipe.id')
          table.string('fridayLunch')
          table.foreign('fridayLunch').references('recipe.id')
          table.string('fridayDinner')
          table.foreign('fridayDinner').references('recipe.id')
        })
      ])
    })
}
