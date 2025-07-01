export const API_ENDPOINTS = {
  BASE: 'https://www.themealdb.com/api/json/v1/1',
  
  RANDOM: 'random.php',
  SEARCH_BY_NAME: (term: string) => `search.php?s=${term}`,
  SEARCH_BY_LETTER: (letter: string) => `search.php?f=${letter}`,
  LOOKUP: (id: string) => `lookup.php?i=${id}`,
  FILTER_BY_INGREDIENT: (ingredient: string) => `filter.php?i=${ingredient}`,
  FILTER_BY_CATEGORY: (category: string) => `filter.php?c=${category}`,
  FILTER_BY_AREA: (area: string) => `filter.php?a=${area}`,
  
  LIST_CATEGORIES: 'categories.php',
  LIST_AREAS: 'list.php?a=list',
  LIST_INGREDIENTS: 'list.php?i=list',
  LIST_CATEGORY_LIST: 'list.php?c=list',
  
  MEAL_THUMB: (id: string) => `https://www.themealdb.com/images/media/meals/${id}/preview`,
  MEAL_THUMB_SIZE: (id: string, size: 'small' | 'medium' | 'large') => `https://www.themealdb.com/images/media/meals/${id}/${size}`,
  INGREDIENT_THUMB: (name: string, size: 'Small' | 'Medium' | 'Large' = 'Small') => `https://www.themealdb.com/images/ingredients/${name.replace(/ /g, '_')}-${size}.png`,
  
  get: (endpoint: string) => `${API_ENDPOINTS.BASE}/${endpoint}`
};