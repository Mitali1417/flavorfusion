/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFavorites } from "@/hooks/useFavorites";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { toast } from "sonner";

export function useRecipeActions() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isSaved, addSavedRecipe, removeSavedRecipe } = useSavedRecipes();

  const handleFavorite = (e: React.MouseEvent, meal: any) => {
    e.preventDefault();
    e.stopPropagation();

    const wasFavorite = isFavorite(meal.idMeal);
    toggleFavorite(meal.idMeal);

    if (wasFavorite) {
      toast.success(`Removed from Favorites`);
    } else {
      toast.success(`Added to Favorites`);
    }
  };

  const handleSave = (e: React.MouseEvent, meal: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved(meal.idMeal)) {
      removeSavedRecipe(meal.idMeal);
      toast.success(`Removed from Saved Recipes`);
    } else {
      addSavedRecipe({
        id: meal.idMeal,
        name: meal.strMeal,
        description: meal.strInstructions,
        ingredients: [],
        instructions: meal.strInstructions
          ? meal.strInstructions.split(/\r?\n/)
          : [],
        cookingTime: "",
        servings: 4,
        difficulty: "",
        cuisine: meal.strArea || "",
        ...meal,
      });
      toast.success(`Recipe Saved`);
    }
  };

  const handleShare = (e: React.MouseEvent, meal: any) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: meal.strMeal,
      text: `Check out this recipe: ${meal.strMeal}`,
      url: `${window.location.origin}/recipe/${meal.idMeal}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Recipe shared!"))
        .catch((err) => toast.error(err.message || "Sharing cancelled or failed."));
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied to clipboard!");
    }
  };

  return {
    handleFavorite,
    handleSave,
    handleShare,
    isFavorite,
    isSaved,
  };
}
