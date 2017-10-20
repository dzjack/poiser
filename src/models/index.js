'use strict'
const Model = require('objection').Model

class Ingredient extends Model {}
class Recipe extends Model {}
class RecipeFrequency extends Model {}
class User extends Model {}
class MealPreference extends Model {}
class UserMealPreference extends Model {}
class Template extends Model {}
class MealType extends Model {}
class Menu extends Model {}

Ingredient.tableName = 'ingredient'
Ingredient.jsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1, maxLength: 255 }
  }
}
Ingredient.relationMappings = {
  recipes: {
    relation: Model.ManyToManyRelation,
    modelClass: Recipe,
    join: {
      from: 'ingredient.id',
      through: {
        from: 'recipeIngredient.ingredientId',
        to: 'recipeIngredient.recipeId'
      },
      to: 'recipe.id'
    }
  }
}

Recipe.tableName = 'recipe'
Recipe.jsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    cookingTime: { type: 'number' },
    description: { type: 'string' },
    steps: { type: 'string' }
  }
}
Recipe.relationMappings = {
  ingredients: {
    relation: Model.ManyToManyRelation,
    modelClass: Ingredient,
    join: {
      from: 'recipe.id',
      through: {
        from: 'recipeIngredient.recipeId',
        to: 'recipeIngredient.ingredientId'
      },
      to: 'ingredient.id'
    }
  },
  mealType: {
    relation: Model.ManyToManyRelation,
    modelClass: MealType,
    join: {
      from: 'recipe.id',
      through: {
        from: 'recipeMealType.recipeId',
        to: 'recipeMealType.mealType.id'
      },
      to: 'mealType.id'
    }
  }
}

RecipeFrequency.tableName = 'recipeFrequency'
RecipeFrequency.jsonSchema = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
    recipeId: { type: 'integer' },
    frequency: { type: 'integer' }
  }
}

User.tableName = 'user'
User.jsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    email: { type: 'string' },
    password: { type: 'string' },
    cookingTime: { type: 'number' }
  }
}
User.relationMappings = {
  ingredients: {
    relation: Model.ManyToManyRelation,
    modelClass: Ingredient,
    join: {
      from: 'user.id',
      through: {
        from: 'userIntolerance.userId',
        to: 'userIntolerance.ingredientId'
      },
      to: 'ingredient.id'
    }
  },
  mealPreference: {
    relation: Model.ManyToManyRelation,
    modelClass: MealPreference,
    join: {
      from: 'user.id',
      through: {
        from: 'userMealPreference.userId',
        to: 'userMealPreference.mealPreferenceId'
      },
      to: 'mealPreference.id'
    }
  }
}

MealPreference.tableName = 'mealPreference'
MealPreference.jsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    type: { type: 'string' }
  }
}
MealPreference.relationMappings = {
  user: {
    relation: Model.ManyToManyRelation,
    modelClass: User,
    join: {
      from: 'mealPreference.id',
      through: {
        from: 'userMealPreference.mealPreferenceId',
        to: 'userMealPreference.userId'
      },
      to: 'user.id'
    }
  }
}

UserMealPreference.tableName = 'userMealPreference'
UserMealPreference.jsonSchema = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
    mealPreferenceId: { type: 'integer' },
    value: { type: 'number' }
  }
}

Template.tableName = 'template'
Template.jsonSchema = {
  type: 'object',
  properties: {
    mondayLunchId: { type: 'integer' },
    mondayDinnerId: { type: 'integer' },
    tuesdayLunchId: { type: 'integer' },
    tuesdayDinnerId: { type: 'integer' },
    wednesdayLunchId: { type: 'integer' },
    wednesdayDinnerId: { type: 'integer' },
    thursdayLunchId: { type: 'integer' },
    thursdayDinnerId: { type: 'integer' },
    fridayLunchId: { type: 'integer' },
    fridayDinnerId: { type: 'integer' }
  }
}
Template.relationMappings = {
  mondayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.mondayLunchId',
      to: 'mealType.id'
    }
  },
  mondayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.mondayDinnerId',
      to: 'mealType.id'
    }
  },
  tuesdayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.tuesdayLunchId',
      to: 'mealType.id'
    }
  },
  tuesdayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.tuesdayDinnerId',
      to: 'mealType.id'
    }
  },
  wednesdayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.wednesdayLunchId',
      to: 'mealType.id'
    }
  },
  wednesdayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.wednesdayDinnerId',
      to: 'mealType.id'
    }
  },
  thursdayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.thursdayLunchId',
      to: 'mealType.id'
    }
  },
  thursdayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.thursdayDinnerId',
      to: 'mealType.id'
    }
  },
  fridayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.fridayLunchId',
      to: 'mealType.id'
    }
  },
  fridayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.fridayDinnerId',
      to: 'mealType.id'
    }
  }
}

MealType.tableName = 'mealType'
MealType.jsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' }
  }
}

Menu.tableName = 'menu'
Menu.jsonSchema = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
    mondayLunchId: { type: 'integer' },
    mondayDinnerId: { type: 'integer' },
    tuesdayLunchId: { type: 'integer' },
    tuesdayDinnerId: { type: 'integer' },
    wednesdayLunchId: { type: 'integer' },
    wednesdayDinnerId: { type: 'integer' },
    thursdayLunchId: { type: 'integer' },
    thursdayDinnerId: { type: 'integer' },
    fridayLunchId: { type: 'integer' },
    fridayDinnerId: { type: 'integer' }
  }
}
Menu.relationMappings = {
  user: {
    relation: Model.belongsToOneRelation,
    modelClass: User,
    join: {
      from: 'menu.userId',
      to: 'user.id'
    }
  },
  mondayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.mondayLunchId',
      to: 'recipe.id'
    }
  },
  mondayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.mondayDinnerId',
      to: 'recipe.id'
    }
  },
  tuesdayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.tuesdayLunchId',
      to: 'recipe.id'
    }
  },
  tuesdayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.tuesdayDinnerId',
      to: 'recipe.id'
    }
  },
  wednesdayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.wednesdayLunchId',
      to: 'recipe.id'
    }
  },
  wednesdayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.wednesdayDinnerId',
      to: 'recipe.id'
    }
  },
  thursdayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.thursdayLunchId',
      to: 'recipe.id'
    }
  },
  thursdayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.thursdayDinnerId',
      to: 'recipe.id'
    }
  },
  fridayLunch: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.fridayLunchId',
      to: 'recipe.id'
    }
  },
  fridayDinner: {
    relation: Model.belongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.fridayDinnerId',
      to: 'recipe.id'
    }
  }
}

module.exports = {
  Recipe,
  Ingredient,
  Template,
  Menu,
  User
}
