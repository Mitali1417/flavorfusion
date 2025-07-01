import { API_ENDPOINTS } from './endpoints';
import type { Meal, Category, Area, Ingredient } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchFromApi<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    return null;
  }
}

const mealDetailCache = new Map<string, Meal>();

export const fetchMealById = async (id: string): Promise<Meal | null> => {
  const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.LOOKUP(id)));
  return data?.meals?.[0] || null;
};

export const fetchMealsByName = async (name: string): Promise<Meal[]> => {
  const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.SEARCH_BY_NAME(name)));
  return data?.meals || [];
};

export const fetchMealsByLetter = async (letter: string): Promise<Meal[]> => {
  const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.SEARCH_BY_LETTER(letter)));
  return data?.meals || [];
};

export const filterByIngredient = async (ingredient: string): Promise<Meal[]> => {
  const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.FILTER_BY_INGREDIENT(ingredient)));
  return data?.meals || [];
};

export const filterByCategory = async (category: string): Promise<Meal[]> => {
  const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.FILTER_BY_CATEGORY(category)));
  return data?.meals || [];
};

export const filterByArea = async (area: string): Promise<Meal[]> => {
  const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.FILTER_BY_AREA(area)));
  return data?.meals || [];
};

export const fetchCategories = async (): Promise<Category[]> => {
  const data = await fetchFromApi<{ categories: Category[] }>(API_ENDPOINTS.get(API_ENDPOINTS.LIST_CATEGORIES));
  return data?.categories || [];
};

export const fetchAreas = async (): Promise<Area[]> => {
  const data = await fetchFromApi<{ meals: Area[] }>(API_ENDPOINTS.get(API_ENDPOINTS.LIST_AREAS));
  return data?.meals || [];
};

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const data = await fetchFromApi<{ meals: Ingredient[] }>(API_ENDPOINTS.get(API_ENDPOINTS.LIST_INGREDIENTS));
  return data?.meals || [];
};

export const getMealThumbnail = (meal: Meal, size: 'small' | 'medium' | 'large' = 'small'): string => {
  if (meal.strMealThumb) {
    if (meal.strMealThumb.endsWith('.jpg')) {
      if (size === 'small') return meal.strMealThumb + '/small';
      if (size === 'medium') return meal.strMealThumb + '/medium';
      if (size === 'large') return meal.strMealThumb + '/large';
    }
    return meal.strMealThumb;
  }
  if (meal.idMeal) return API_ENDPOINTS.MEAL_THUMB(meal.idMeal);
  return '/placeholder-meal.jpg';
};

export const getIngredientThumbnail = (ingredientName: string, size: 'Small' | 'Medium' | 'Large' = 'Small'): string => {
  const safeName = ingredientName.replace(/ /g, '_');
  return `https://www.themealdb.com/images/ingredients/${safeName}-${size}.png`;
};

export const useMealById = (id: string) =>
  useQuery({
    queryKey: ['meal', id],
    queryFn: async () => {
      if (mealDetailCache.has(id)) return mealDetailCache.get(id)!;
      const data = await fetchFromApi<{ meals: Meal[] }>(API_ENDPOINTS.get(API_ENDPOINTS.LOOKUP(id)));
      const meal = data?.meals?.[0] || null;
      if (meal) mealDetailCache.set(id, meal);
      return meal;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });