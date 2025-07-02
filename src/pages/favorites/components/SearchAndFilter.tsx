import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChefHat, MapPin, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
interface SearchAndFiltersProps {
  categories: string[];
  areas: string[];
  activeFiltersCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterArea: string;
  setFilterArea: (area: string) => void;
  sortBy: "name" | "category" | "area" | "recent";
  setSortBy: (sortBy: "name" | "category" | "area" | "recent") => void;
  clearFilters: () => void;
}

export const SearchAndFilters = ({
  categories,
  areas,
  activeFiltersCount,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterArea,
  setFilterArea,
  sortBy,
  setSortBy,
  clearFilters,
}: SearchAndFiltersProps) => {
  return (
    <Card className='mb-2 md:mb-4 mx-auto'>
      <CardContent className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
        <div className="relative max-w-lg w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="area">Cuisine</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterArea} onValueChange={setFilterArea}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cuisines</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button variant={"outline"} size="sm" onClick={clearFilters}>
              <X className="h-4 w-4  mr-1" /> Clear All
            </Button>
          )}

          {searchTerm ||
            filterCategory !== "all" ||
            (filterArea !== "all" && (
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <Badge variant="secondary">
                    <Search className="h-3 w-3" />
                    {searchTerm}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchTerm("")}
                      className="ml-1 h-4 w-4"
                    >
                      <X className="h-3 w-3 mr-1" />
                    </Button>
                  </Badge>
                )}
                {filterCategory !== "all" && (
                  <Badge variant="secondary">
                    <ChefHat className="h-3 w-3 mr-1" />
                    {filterCategory}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                      className="ml-1 h-4 w-4"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filterArea !== "all" && (
                  <Badge variant="secondary">
                    <MapPin className="h-3 w-3 mr-1" />
                    {filterArea}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilterArea("all")}
                      className="ml-1 h-4 w-4"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
