
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface RecipeStep {
  step: number;
  instruction: string;
}

interface RecipeInstructionsProps {
  instructions: RecipeStep[];
}

export const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <h4 className="font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            Instructions
          </h4>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {instructions.map((instruction, index) => (
          <div
            key={index}
            className="flex items-start gap-4 py-4 px-6 rounded-xl border shadow-md transition-all duration-500"
          >
            <h6 className="!text-primary">{instruction.step}</h6>
            <p className="text-sm leading-relaxed">{instruction.instruction}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};