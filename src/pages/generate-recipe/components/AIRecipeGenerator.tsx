import { useState, useRef } from "react";
import {
  Wand2,
  Sparkles,
  X,
  Loader2,
  Plus,
  Star,
  Share2,
  ChefHat,
  Utensils,
  BookOpen,
  Bookmark,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateAIRecipe, type AIRecipeResponse } from "@/hooks/gemini";
import { useRecipeActions } from "@/hooks/useRecipeActions";

type AIIngredient =
  | string
  | { item?: string; quantity?: string; unit?: string };
interface LocalAIRecipeResponse extends Omit<AIRecipeResponse, "ingredients"> {
  ingredients: AIIngredient[];
}

export default function AIRecipeGenerator() {
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] =
    useState<LocalAIRecipeResponse | null>(null);
  const [recipePreferences, setRecipePreferences] = useState("");
  const [error, setError] = useState<string | null>(null);
  const lastRequestRef = useRef<{
    ingredients: string[];
    preferences: string;
  } | null>(null);

  const { handleSave, handleShare } = useRecipeActions();

  function isAIIngredientObject(
    ingredient: unknown
  ): ingredient is { item?: string; quantity?: string; unit?: string } {
    return (
      typeof ingredient === "object" &&
      ingredient !== null &&
      ("item" in ingredient || "quantity" in ingredient || "unit" in ingredient)
    );
  }

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !recipeIngredients.includes(currentIngredient.trim())
    ) {
      setRecipeIngredients([...recipeIngredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setRecipeIngredients(recipeIngredients.filter((ing) => ing !== ingredient));
  };

  const generateRecipe = async () => {
    if (recipeIngredients.length === 0) return;
    setIsGenerating(true);
    setError(null);
    lastRequestRef.current = {
      ingredients: recipeIngredients,
      preferences: recipePreferences,
    };
    try {
      const aiRecipe = await generateAIRecipe({
        ingredients: recipeIngredients,
        preferences: recipePreferences,
      });
      if (!aiRecipe) {
        setError(
          "AI could not generate a recipe. Please check your API key, try again, or see debug info below."
        );
        setGeneratedRecipe(null);
      } else {
        setGeneratedRecipe(aiRecipe as LocalAIRecipeResponse);
      }
    } catch (e) {
      setError((e as Error)?.message || "Failed to generate recipe. Please try again later.");
      setGeneratedRecipe(null);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 space-x-10 space-y-4 bg-primary/20 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-lg">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200/50 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span className="text-primary/70 font-medium">
                  Start Cooking Magic
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Create Magic with Your
                <span className="text-3xl md:text-4xl bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  {""} Ingredients
                </span>
              </h2>
              <p className="max-w-2xl mx-auto">
                Transform your available ingredients into delicious recipes with
                the power of AI. Just add what you have, and let our chef AI do
                the rest!
              </p>
            </div>

            <Card className="lg:col-span-2 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Utensils className="w-6 h-6 text-rose-500" />
                  Chef’s Choice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 items-start justify-between">
                  <div className="space-y-3 w-full">
                    <label className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Your Ingredients
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., chicken, tomatoes, basil..."
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                        className="flex-1"
                      />
                      <Button
                        onClick={addIngredient}
                        className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-4"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {recipeIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {recipeIngredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline">
                          <span>{ingredient}</span>
                          <button
                            onClick={() => removeIngredient(ingredient)}
                            className="ml-2 text-rose-500 hover:text-rose-700 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex  flex-col gap-2 items-center justify-between">
                  {/* Preferences */}
                  <div className="w-full space-y-3">
                    <label className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Recipe Preferences (Optional)
                    </label>
                    <Textarea
                      placeholder="e.g., vegetarian, spicy, quick meal, Italian style, low-carb..."
                      value={recipePreferences}
                      onChange={(e) => setRecipePreferences(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="">
                    <Button
                      onClick={generateRecipe}
                      disabled={recipeIngredients.length === 0 || isGenerating}
                      className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Creating Your Perfect Recipe...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-5 w-5 mr-2" />
                          Get a Recipe
                        </>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <div className="border rounded-xl p-4 text-center">
                      <p className="text-red-700 font-medium mb-2">{error}</p>
                      <Button
                        onClick={generateRecipe}
                        disabled={isGenerating}
                        variant="outline"
                        className="text-red-700 bg-transparent"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-3xl">
            <CardHeader className="pb-4">
              <h3 className="flex items-center gap-2 text-2xl">
                <BookOpen className="w-6 h-6 text-primary" />
                Your Recipe
              </h3>
            </CardHeader>
            <CardContent>
              {!generatedRecipe && !isGenerating && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Cook Something Amazing?
                  </h3>
                  <p>
                    Add your ingredients and let our AI chef create the perfect
                    recipe for you!
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 border rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Cooking Up Something Special...
                  </h3>
                  <p>
                    Our AI chef is analyzing your ingredients and creating the
                    perfect recipe!
                  </p>
                </div>
              )}

              {generatedRecipe && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      {generatedRecipe.name}
                    </h3>
                    <p>{generatedRecipe.description}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pb-6 max-w-xs mx-auto">
                    <Button
                      onClick={(e) => handleSave(e, generatedRecipe)}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Recipe
                    </Button>
                    <Button
                      onClick={(e) => handleShare(e, generatedRecipe)}
                      variant="outline"
                      className="flex-1 border-gray-300 hover:bg-gray-50"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Recipe
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-rose-500" />
                      Ingredients
                    </h4>
                    <div className="rounded-xl p-4 border">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-2">
                        {generatedRecipe.ingredients.map(
                          (ingredient, index) => {
                            let display = "";
                            if (typeof ingredient === "string") {
                              display = ingredient;
                            } else if (isAIIngredientObject(ingredient)) {
                              display = [
                                ingredient.item,
                                ingredient.quantity,
                                ingredient.unit,
                              ]
                                .filter(Boolean)
                                .join(" ");
                              if (!display)
                                display = JSON.stringify(ingredient);
                            }
                            return (
                              <li
                                key={index}
                                className="text-sm flex items-center gap-2"
                              >
                                <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
                                {display}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-500" />
                      Instructions
                    </h4>
                    <div className="space-y-3">
                      {generatedRecipe.instructions.map(
                        (instruction, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl border shadow-sm"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-sm leading-relaxed">
                              {instruction}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
