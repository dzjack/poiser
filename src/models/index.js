'use strict'
const Model = require('objection').Model

class Ingredient extends Model {}
class Recipe extends Model {}
class RecipeFrequency extends Model {}
class User extends Model {}
class UserIntolerance extends Model {}
class MealPreference extends Model {}
class UserMealPreference extends Model {}
class Template extends Model {}
class MealType extends Model {}
class Menu extends Model {}

Ingredient.tableName = 'ingredient'
Ingredient.jsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 255 }
  }
}
Ingredient.relationMappings = {
  recipes: {
    relation: Model.ManyToManyRelation,
    modelClass: Recipe,
    join: {
      from: 'ingredient.name',
      through: {
        from: 'recipeIngredient.ingredientName',
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
        to: 'recipeIngredient.ingredientName'
      },
      to: 'ingredient.name'
    }
  },
  mealType: {
    relation: Model.ManyToManyRelation,
    modelClass: MealType,
    join: {
      from: 'recipe.id',
      through: {
        from: 'recipeMealType.recipeId',
        to: 'recipeMealType.mealTypeName'
      },
      to: 'mealType.name'
    }
  }
}

RecipeFrequency.tableName = 'recipeFrequency'
RecipeFrequency.jsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    recipeId: { type: 'integer' },
    frequency: { type: 'integer' }
  }
}

RecipeFrequency.relationMappings = {
  user: {
    relation: Model.BelongsToOneRelation,
    modelClass: User,
    join: {
      from: 'recipeFrequency.userId',
      to: 'user.id'
    }
  },
  recipe: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'recipeFrequency.recipeId',
      to: 'recipe.id'
    }
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
  ingredientsAvoided: {
    relation: Model.ManyToManyRelation,
    modelClass: Ingredient,
    join: {
      from: 'user.id',
      through: {
        from: 'ingredientAvoid.userId',
        to: 'ingredientAvoid.ingredientName'
      },
      to: 'ingredient.name'
    }
  },
  mealPreferences: {
    relation: Model.ManyToManyRelation,
    modelClass: MealPreference,
    join: {
      from: 'user.id',
      through: {
        from: 'userMealPreference.userId',
        to: 'userMealPreference.mealPreferenceName'
      },
      to: 'mealPreference.name'
    }
  },
  intolerances: {
    relation: Model.ManyToManyRelation,
    modelClass: Ingredient,
    join: {
      from: 'user.id',
      through: {
        from: 'userIntolerance.userId',
        to: 'userIntolerance.ingredientName'
      },
      to: 'ingredient.name'
    }
  },
  template: {
    relation: Model.HasOneRelation,
    modelClass: Template,
    join: {
      from: 'user.templateId',
      to: 'template.id'
    }
  }
}

UserIntolerance.tableName = 'userIntolerance'
UserIntolerance.jsonSchema = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
    ingredientName: { type: 'string' }
  }
}
UserIntolerance.relationMappings = {
  user: {
    relation: Model.BelongsToOneRelation,
    modelClass: User,
    join: {
      from: 'userIntolerance.userId',
      to: 'user.id'
    }
  },
  ingredient: {
    relation: Model.BelongsToOneRelation,
    modelClass: Ingredient,
    join: {
      from: 'userIntolerance.ingredientName',
      to: 'ingredient.name'
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
      from: 'mealPreference.name',
      through: {
        from: 'userMealPreference.mealPreferenceName',
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
    mealPreferenceName: { type: 'integer' },
    value: { type: 'number' }
  }
}

Template.tableName = 'template'
Template.jsonSchema = {
  type: 'object',
  properties: {
    mondayLunch: { type: 'string' },
    mondayDinner: { type: 'string' },
    tuesdayLunch: { type: 'string' },
    tuesdayDinner: { type: 'string' },
    wednesdayLunch: { type: 'string' },
    wednesdayDinner: { type: 'string' },
    thursdayLunch: { type: 'string' },
    thursdayDinner: { type: 'string' },
    fridayLunch: { type: 'string' },
    fridayDinner: { type: 'string' }
  }
}
Template.relationMappings = {
  mondayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.mondayLunch',
      to: 'mealType.name'
    }
  },
  mondayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.mondayDinner',
      to: 'mealType.name'
    }
  },
  tuesdayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.tuesdayLunch',
      to: 'mealType.name'
    }
  },
  tuesdayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.tuesdayDinner',
      to: 'mealType.name'
    }
  },
  wednesdayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.wednesdayLunch',
      to: 'mealType.name'
    }
  },
  wednesdayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.wednesdayDinner',
      to: 'mealType.name'
    }
  },
  thursdayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.thursdayLunch',
      to: 'mealType.name'
    }
  },
  thursdayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.thursdayDinner',
      to: 'mealType.name'
    }
  },
  fridayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.fridayLunch',
      to: 'mealType.name'
    }
  },
  fridayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: MealType,
    join: {
      from: 'template.fridayDinner',
      to: 'mealType.name'
    }
  }
}

MealType.tableName = 'mealType'
MealType.jsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
}

Menu.tableName = 'menu'
Menu.jsonSchema = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
    mondayLunch: { type: 'string' },
    mondayDinner: { type: 'string' },
    tuesdayLunch: { type: 'string' },
    tuesdayDinner: { type: 'string' },
    wednesdayLunch: { type: 'string' },
    wednesdayDinner: { type: 'string' },
    thursdayLunch: { type: 'string' },
    thursdayDinner: { type: 'string' },
    fridayLunch: { type: 'string' },
    fridayDinner: { type: 'string' }
  }
}
Menu.relationMappings = {
  user: {
    relation: Model.BelongsToOneRelation,
    modelClass: User,
    join: {
      from: 'menu.userId',
      to: 'user.id'
    }
  },
  mondayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.mondayLunch',
      to: 'recipe.id'
    }
  },
  mondayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.mondayDinner',
      to: 'recipe.id'
    }
  },
  tuesdayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.tuesdayLunch',
      to: 'recipe.id'
    }
  },
  tuesdayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.tuesdayDinner',
      to: 'recipe.id'
    }
  },
  wednesdayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.wednesdayLunch',
      to: 'recipe.id'
    }
  },
  wednesdayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.wednesdayDinner',
      to: 'recipe.id'
    }
  },
  thursdayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.thursdayLunch',
      to: 'recipe.id'
    }
  },
  thursdayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.thursdayDinner',
      to: 'recipe.id'
    }
  },
  fridayLunch: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.fridayLunch',
      to: 'recipe.id'
    }
  },
  fridayDinner: {
    relation: Model.BelongsToOneRelation,
    modelClass: Recipe,
    join: {
      from: 'menu.fridayDinner',
      to: 'recipe.id'
    }
  }
}

module.exports = {
  Recipe,
  RecipeFrequency,
  Ingredient,
  Template,
  Menu,
  User,
  MealType,
  MealPreference,
  UserIntolerance
}
