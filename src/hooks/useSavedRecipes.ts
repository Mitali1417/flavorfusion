/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { useEffect } from 'react';

export interface SavedRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: any[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: string;
  cuisine: string;
  [key: string]: any;
}

interface SavedRecipesState {
  savedRecipes: SavedRecipe[];
  addSavedRecipe: (recipe: SavedRecipe) => void;
  removeSavedRecipe: (id: string) => void;
  isSaved: (id: string) => boolean;
  setSavedRecipes: (recipes: SavedRecipe[]) => void;
}

export const useSavedRecipesStore = create<SavedRecipesState>((set, get) => ({
  savedRecipes: [],
  addSavedRecipe: (recipe) => {
    const { savedRecipes } = get();
    if (!savedRecipes.find(r => r.id === recipe.id)) {
      const updated = [...savedRecipes, recipe];
      set({ savedRecipes: updated });
      localStorage.setItem('savedAIRecipes', JSON.stringify(updated));
       }
  },
  removeSavedRecipe: (id) => {
    const { savedRecipes } = get();
    const updated = savedRecipes.filter(r => r.id !== id);
    set({ savedRecipes: updated });
    localStorage.setItem('savedAIRecipes', JSON.stringify(updated));
 },
  isSaved: (id) => {
    const { savedRecipes } = get();
    return savedRecipes.some(r => r.id === id);
  },
  setSavedRecipes: (recipes) => set({ savedRecipes: recipes }),
}));

export function useSavedRecipes() {
  const savedRecipes = useSavedRecipesStore(state => state.savedRecipes);
  const addSavedRecipe = useSavedRecipesStore(state => state.addSavedRecipe);
  const removeSavedRecipe = useSavedRecipesStore(state => state.removeSavedRecipe);
  const isSaved = useSavedRecipesStore(state => state.isSaved);
  const setSavedRecipes = useSavedRecipesStore(state => state.setSavedRecipes);

  useEffect(() => {
    const saved = localStorage.getItem('savedAIRecipes');
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, [setSavedRecipes]);

  return { savedRecipes, addSavedRecipe, removeSavedRecipe, isSaved };
}

export function subscribeToSavedRecipes(callback: (recipes: SavedRecipe[]) => void) {
  return useSavedRecipesStore.subscribe((state) => callback(state.savedRecipes));
} 