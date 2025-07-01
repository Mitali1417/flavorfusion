import { List, MapPin, Tag, RotateCcw } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { Category, Area, Ingredient } from "@/types";

interface FiltersProps {
  categories: Category[];
  areas: Area[];
  ingredients: Ingredient[];
}

export const Filters = ({ categories, areas, ingredients }: FiltersProps) => {
  const {
    selectedCategory,
    selectedArea,
    selectedIngredient,
    selectedLetter,
    setCategory,
    setArea,
    setIngredient,
    setLetter,
    clearFilters,
  } = useGlobalStore();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4">
      <Select value={selectedCategory} onValueChange={setCategory}>
        <SelectTrigger>
          <div className="flex items-center font-body ">
            <List className="h-4 w-4 mr-2 " />
            <SelectValue placeholder="Category" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <SelectItem value="all">Categories</SelectItem>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <SelectItem
                key={category.idCategory}
                value={category.strCategory}
              >
                {category.strCategory}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={selectedArea} onValueChange={setArea}>
        <SelectTrigger>
          <div className="flex items-center font-body ">
            <MapPin className="h-4 w-4 mr-2 " />
            <SelectValue placeholder="Cuisine" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <SelectItem value="all">Cuisines</SelectItem>
          {Array.isArray(areas) &&
            areas.map((area) => (
              <SelectItem key={area.strArea} value={area.strArea}>
                {area.strArea}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={selectedIngredient} onValueChange={setIngredient}>
        <SelectTrigger>
          <div className="flex items-center font-body ">
            <Tag className="h-4 w-4 mr-2 " />
            <SelectValue placeholder="Ingredient" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-2xl max-h-60">
          <SelectItem value="all">Ingredients</SelectItem>
          {Array.isArray(ingredients) &&
            ingredients.slice(0, 50).map((ingredient) => (
              <SelectItem
                key={ingredient.strIngredient}
                value={ingredient.strIngredient}
              >
                {ingredient.strIngredient}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Letter Filter */}
      <Select value={selectedLetter} onValueChange={setLetter}>
        <SelectTrigger className="w-32 rounded-2xl">
          <div className="flex items-center font-body ">
            <span className=" font-bold mr-2">A-Z</span>
            <SelectValue placeholder="Letter" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <SelectItem value="all">All</SelectItem>
          {alphabet.map((letter) => (
            <SelectItem key={letter} value={letter.toLowerCase()}>
              {letter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={clearFilters} variant="outline" className="rounded-full">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};
