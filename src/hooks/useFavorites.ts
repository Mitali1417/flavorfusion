import { useEffect, useState } from 'react';
import type { Meal } from '@/types';
import { fetchMealById } from '@/api/meal.db';
import { useGlobalStore } from '../store/useGlobalStore';

export const useFavorites = () => {
  const favoriteMealIds = useGlobalStore(state => state.favoriteMealIds);
  const toggleFavorite = useGlobalStore(state => state.toggleFavorite);
  const setFavorites = useGlobalStore(state => state.setFavorites);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteMeals');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, [setFavorites]);

  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      setLoading(true);
      const meals = await Promise.all(favoriteMealIds.map(id => fetchMealById(id)));
      setFavoriteMeals(meals.filter(Boolean) as Meal[]);
      setLoading(false);
    };
    if (favoriteMealIds.length > 0) {
      fetchFavoriteMeals();
    } else {
      setFavoriteMeals([]);
      setLoading(false);
    }
  }, [favoriteMealIds]);

  const isFavorite = (mealId: string) => favoriteMealIds.includes(mealId);

  return { favoriteMealIds, favoriteMeals, toggleFavorite, loading, isFavorite };
};