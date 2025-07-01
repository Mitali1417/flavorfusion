import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
type SearchAndFilterProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  cuisines: string[];
  difficulties: string[];
  filterCuisine: string;
  setFilterCuisine: (value: string) => void;
  filterDifficulty: string;
  setFilterDifficulty: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
};

export const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  cuisines,
  difficulties,
  filterCuisine,
  setFilterCuisine,
  filterDifficulty,
  setFilterDifficulty,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: SearchAndFilterProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
          <div className="relative max-w-lg w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Select value={filterCuisine} onValueChange={setFilterCuisine}>
              <SelectTrigger>
                <SelectValue placeholder="All Cuisines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                {cuisines
                  .filter((cuisine: string) => cuisine && cuisine.trim() !== "")
                  .map((cuisine: string) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select
              value={filterDifficulty}
              onValueChange={setFilterDifficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficulties
                  .filter(
                  (difficulty: string) => difficulty && difficulty.trim() !== ""
                  )
                  .map((difficulty: string) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="cookingTime">Cooking Time</SelectItem>
                  <SelectItem value="servings">Servings</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
      </CardContent>
    </Card>
  );
};
