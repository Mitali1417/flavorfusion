// types/index.ts

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strDrinkAlternate?: string;
  [key: `strIngredient${number}`]: string;
  [key: `strMeasure${number}`]: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Area {
  strArea: string;
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  recipes: string[];
  coverImage: string;
  isPrivate: boolean;
  createdAt: Date;
}

export interface GeneratedRecipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: string;
  cuisine: string;
}

export interface RecipeStep {
  step: number;
  instruction: string;
}

export interface RecipeIngredient {
  ingredient: string;
  measure: string;
}
