import { useState } from "react";
import {
  Clock,
  Users,
  Star,
  Bookmark,
  ChefHat,
  Utensils,
  BookOpen,
  Trash2,
  Share2,
  Eye,
  Grid3X3,
  List,
} from "lucide-react";
import { useSavedRecipes } from "../../hooks/useSavedRecipes";
import PageLoader from "@/components/shared/PageLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { SearchAndFilter } from "./components/SearchAndFilter";

type AIIngredient =
  | string
  | { item?: string; quantity?: string; unit?: string };

interface LocalAIRecipeResponse {
  id?: string;
  name: string;
  description: string;
  ingredients: AIIngredient[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: string;
  cuisine: string;
}

function isAIIngredientObject(
  ingredient: unknown
): ingredient is { item?: string; quantity?: string; unit?: string } {
  return (
    typeof ingredient === "object" &&
    ingredient !== null &&
    ("item" in ingredient || "quantity" in ingredient || "unit" in ingredient)
  );
}

export default function SavedRecipesPage() {
  const { savedRecipes, removeSavedRecipe } = useSavedRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterCuisine, setFilterCuisine] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedRecipe, setSelectedRecipe] =
    useState<LocalAIRecipeResponse | null>(null);

  if (!savedRecipes) {
    return <PageLoader />;
  }

  const cuisines = Array.from(
    new Set(savedRecipes.map((recipe) => recipe.cuisine))
  );
  const difficulties = Array.from(
    new Set(savedRecipes.map((recipe) => recipe.difficulty))
  );

  const filteredRecipes = savedRecipes
    .filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine =
        filterCuisine === "all" || recipe.cuisine === filterCuisine;
      const matchesDifficulty =
        filterDifficulty === "all" || recipe.difficulty === filterDifficulty;
      return matchesSearch && matchesCuisine && matchesDifficulty;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "cookingTime":
          comparison =
            Number.parseInt(a.cookingTime) - Number.parseInt(b.cookingTime);
          break;
        case "servings":
          comparison = a.servings - b.servings;
          break;
        case "difficulty":
          comparison = a.difficulty.localeCompare(b.difficulty);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleShare = (recipe: LocalAIRecipeResponse) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: recipe.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${recipe.name}\n\n${recipe.description}`);
      toast.success("Recipe copied to clipboard!");
    }
  };

  const formatIngredient = (ingredient: AIIngredient): string => {
    if (typeof ingredient === "string") {
      return ingredient;
    } else if (isAIIngredientObject(ingredient)) {
      const parts = [
        ingredient.quantity,
        ingredient.unit,
        ingredient.item,
      ].filter(Boolean);
      return parts.join(" ") || JSON.stringify(ingredient);
    }
    return "";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-xl mr-4">
            <Bookmark className="h-6 w-6 text-white fill-current" />
          </div>
          <div>
            <h2>Saved Recipes</h2>
            <p>{savedRecipes.length} delicious recipes saved</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="flex items-center gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cuisines={cuisines}
        difficulties={difficulties}
        filterCuisine={filterCuisine}
        setFilterCuisine={setFilterCuisine}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {filteredRecipes.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100/10 p-6 rounded-full mb-6">
                <Bookmark className="h-12 w-12 text-orange-600" />
              </div>
              <h3>
                {searchTerm ||
                filterCuisine !== "all" ||
                filterDifficulty !== "all"
                  ? "No recipes match your filters"
                  : "No saved recipes yet"}
              </h3>
              <p className="max-w-md">
                {searchTerm ||
                filterCuisine !== "all" ||
                filterDifficulty !== "all"
                  ? "Try adjusting your search terms or filters to find more recipes."
                  : "Start generating and saving some delicious AI recipes to see them here!"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredRecipes.map((recipe, idx) => (
            <Card
              key={recipe.id || idx}
              className={`group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
            >
              {/* <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                  <div
                    className={`bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center ${viewMode === "list" ? "h-full rounded-l-lg" : "h-48 rounded-t-lg"
                      }`}
                  >
                    <ChefHat className="w-12 h-12 text-white opacity-80" />
                  </div>
                </div> */}

              <div
                className={`flex-1 ${
                  viewMode === "list" ? "flex flex-col" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5>{recipe.name}</h5>
                      <p className="text-sm mt-1 line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(recipe)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSavedRecipe(recipe.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">{recipe.cuisine}</Badge>
                    <Badge
                      variant="secondary"
                      className={`${getDifficultyColor(recipe.difficulty)}`}
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.cookingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>AI Generated</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mx-auto flex items-center gap-2 hover:bg-orange-50 hover:border-orange-200 bg-transparent"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <Eye className="w-4 h-4" />
                        View Full Recipe
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="!max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="!text-3xl">
                          {selectedRecipe?.name}
                        </DialogTitle>
                        <DialogDescription>
                          {selectedRecipe?.description}
                        </DialogDescription>
                      </DialogHeader>

                      {selectedRecipe && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="text-center p-3 border rounded-lg">
                              <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                              <div className="text-sm font-medium">
                                {selectedRecipe.servings} servings
                              </div>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                              <ChefHat className="w-5 h-5 text-green-600 mx-auto mb-1" />
                              <div className="text-sm font-medium">
                                {selectedRecipe.difficulty}
                              </div>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                              <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                              <div className="text-sm font-medium">
                                {selectedRecipe.cuisine}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <Utensils className="w-5 h-5" />
                              Ingredients
                            </h3>
                            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 space-y-2">
                              {selectedRecipe.ingredients.map(
                                (ingredient, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center gap-2 p-2 rounded"
                                  >
                                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                                    {formatIngredient(ingredient)}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          {/* Instructions */}
                          <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <BookOpen className="w-5 h-5" />
                              Instructions
                            </h3>
                            <ol className="space-y-3">
                              {selectedRecipe.instructions.map(
                                (instruction, i) => (
                                  <li
                                    key={i}
                                    className="flex gap-3 p-3 border rounded-lg"
                                  >
                                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                      {i + 1}
                                    </div>
                                    <div className="flex-1">{instruction}</div>
                                  </li>
                                )
                              )}
                            </ol>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
