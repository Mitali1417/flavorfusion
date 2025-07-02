import { Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface RecipeIngredient {
  ingredient: string;
  measure: string;
}

interface RecipeIngredientsProps {
  ingredients: RecipeIngredient[];
}

export const RecipeIngredients = ({
  ingredients,
}: RecipeIngredientsProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
              <Utensils className="w-4 h-4 text-white" />
            </div>
            Ingredients
          </h4>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-2">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="text-sm flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
              <div>
                <span className="text-primary">{item.ingredient}</span>
                <span className="ml-2">{item.measure}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};