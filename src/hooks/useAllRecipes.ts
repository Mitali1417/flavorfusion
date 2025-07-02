import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import {
  fetchAreas,
  fetchCategories,
  fetchIngredients,
  fetchMealsByLetter,
  fetchMealsByName,
  filterByArea,
  filterByCategory,
  filterByIngredient,
} from "@/api/meal.db";

interface AllRecipesProps {
  searchTerm: string;
  selectedCategory: string;
  selectedArea: string;
  selectedIngredient: string;
  selectedLetter: string;
}
export const useAllRecipes = ({
  searchTerm,
  selectedCategory,
  selectedArea,
  selectedIngredient,
  selectedLetter,
}: AllRecipesProps) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 350);
  const debouncedCategory = useDebounce(selectedCategory, 350);
  const debouncedArea = useDebounce(selectedArea, 350);
  const debouncedIngredient = useDebounce(selectedIngredient, 350);
  const debouncedLetter = useDebounce(selectedLetter, 350);

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60,
  });
  const { data: areas = [], isLoading: loadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: fetchAreas,
    staleTime: 1000 * 60 * 60,
  });
  const { data: ingredients = [], isLoading: loadingIngredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: 1000 * 60 * 60,
  });

  const { data: meals = [], isLoading: loadingMeals } = useQuery({
    queryKey: [
      "meals",
      debouncedSearchTerm,
      debouncedCategory,
      debouncedArea,
      debouncedIngredient,
      debouncedLetter,
    ],
    queryFn: async () => {
      if (debouncedLetter !== "all") return fetchMealsByLetter(debouncedLetter);
      if (debouncedCategory !== "all") return filterByCategory(debouncedCategory);
      if (debouncedArea !== "all") return filterByArea(debouncedArea);
      if (debouncedIngredient !== "all") return filterByIngredient(debouncedIngredient);
      if (debouncedSearchTerm) return fetchMealsByName(debouncedSearchTerm);
      const letters = ['a', 'b', 'c'];
      const results = await Promise.all(letters.map(fetchMealsByLetter));
      const all = results.flat();
      const unique = Array.from(new Map(all.map(m => [m.idMeal, m])).values());
      return unique;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    meals,
    loadingMeals,
    categories,
    loadingCategories,
    areas,
    loadingAreas,
    ingredients,
    loadingIngredients,
  };
};
