import { useParams } from 'react-router-dom';
import { fetchMealById } from '../../api/meal.db';
import PageLoader from '@/components/shared/PageLoader';
import { useQuery } from '@tanstack/react-query';
import Recipe from './components/Recipe';

const RecipePage = () => {
  const { id } = useParams();

  const {
    data: meal,
    isLoading,
  } = useQuery({
    queryKey: ['meal', id],
    queryFn: () => id ? fetchMealById(id) : null,
    enabled: !!id,
  });

  if (isLoading) return <PageLoader />;
  if (!meal) return null;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map(i => ({
      ingredient: meal[`strIngredient${i}`]?.trim(),
      measure: meal[`strMeasure${i}`]?.trim()
    }))
    .filter(item => item.ingredient);

  const instructions = meal.strInstructions
    .split(/\r?\n/)
    .filter((step: string) => step.trim())
    .map((step: string, index: number) => ({
      step: index + 1,
      instruction: step.trim(),
    }));

  return (
    <Recipe meal={meal} ingredients={ingredients} instructions={instructions} />
  );
};

export default RecipePage;