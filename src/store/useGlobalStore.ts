import { create } from 'zustand';

interface GlobalState {
  searchTerm: string;
  selectedCategory: string;
  selectedArea: string;
  selectedIngredient: string;
  selectedLetter: string;
  favoriteMealIds: string[];
  // Actions
  setSearchTerm: (term: string) => void;
  setCategory: (category: string) => void;
  setArea: (area: string) => void;
  setIngredient: (ingredient: string) => void;
  setLetter: (letter: string) => void;
  clearFilters: () => void;
  toggleFavorite: (mealId: string) => void;
  setFavorites: (ids: string[]) => void;
  initializeStore: () => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  searchTerm: '',
  selectedCategory: 'all',
  selectedArea: 'all',
  selectedIngredient: 'all',
  selectedLetter: 'all',
  favoriteMealIds: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (category) => set({ selectedCategory: category }),
  setArea: (area) => set({ selectedArea: area }),
  setIngredient: (ingredient) => set({ selectedIngredient: ingredient }),
  setLetter: (letter) => set({ selectedLetter: letter }),
  clearFilters: () => set({
    searchTerm: '',
    selectedCategory: 'all',
    selectedArea: 'all',
    selectedIngredient: 'all',
    selectedLetter: 'all',
  }),
  toggleFavorite: (mealId) => {
    const { favoriteMealIds } = get();
    const updated = favoriteMealIds.includes(mealId)
      ? favoriteMealIds.filter(id => id !== mealId)
      : [...favoriteMealIds, mealId];
    set({ favoriteMealIds: updated });
    localStorage.setItem('favoriteMeals', JSON.stringify(updated));
  },
  setFavorites: (ids) => set({ favoriteMealIds: ids }),
  initializeStore: () => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteMeals');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        set({ favoriteMealIds: favorites });
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  },
})); 