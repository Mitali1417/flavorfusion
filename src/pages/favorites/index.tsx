import { useFavorites } from "@/hooks/useFavorites";
import type { Meal } from "../../types";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Grid3X3,
  Heart,
  List,
  Share2,
  ChefHat,
  MapPin,
  Tag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLoader from "@/components/shared/PageLoader";
import { SearchAndFilters } from "./components/SearchAndFilter";
import { useRecipeActions } from "@/hooks/useRecipeActions";

export const FavoritesPage = () => {
  const { favoriteMeals, loading } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState<"name" | "category" | "area" | "recent">(
    "recent"
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterArea, setFilterArea] = useState<string>("all");
  const navigate = useNavigate();

  const { handleFavorite, handleShare, isFavorite } = useRecipeActions();

  const categories = useMemo(() => {
    const cats = [...new Set(favoriteMeals.map((meal) => meal.strCategory))];
    return cats.sort();
  }, [favoriteMeals]);

  const areas = useMemo(() => {
    const areas = [...new Set(favoriteMeals.map((meal) => meal.strArea))];
    return areas.sort();
  }, [favoriteMeals]);

  const filteredAndSortedFavorites = useMemo(() => {
    const filtered = favoriteMeals.filter((meal: Meal) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        meal.strMeal.toLowerCase().includes(query) ||
        meal.strCategory.toLowerCase().includes(query) ||
        meal.strArea.toLowerCase().includes(query) ||
        (meal.strTags && meal.strTags.toLowerCase().includes(query));

      const matchesCategory =
        filterCategory === "all" || meal.strCategory === filterCategory;
      const matchesArea = filterArea === "all" || meal.strArea === filterArea;

      return matchesSearch && matchesCategory && matchesArea;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.strMeal.localeCompare(b.strMeal);
        case "category":
          return a.strCategory.localeCompare(b.strCategory);
        case "area":
          return a.strArea.localeCompare(b.strArea);
        case "recent":
        default:
          return 0; // Keep original order for recent
      }
    });

    return filtered;
  }, [searchTerm, favoriteMeals, sortBy, filterCategory, filterArea]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("all");
    setFilterArea("all");
    setSortBy("recent");
  };

  const activeFiltersCount = [
    searchTerm,
    filterCategory !== "all" ? filterCategory : null,
    filterArea !== "all" ? filterArea : null,
    sortBy !== "recent" ? sortBy : null,
  ].filter(Boolean).length;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <header className="mx-auto px-4 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-xl mr-4">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h2>My Favorites</h2>
              <p>Your personal recipe collection</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-xl transition-all duration-500 hover:scale-105"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-xl transition-all duration-500 hover:scale-105"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterArea={filterArea}
          setFilterArea={setFilterArea}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          areas={areas}
          activeFiltersCount={activeFiltersCount}
          clearFilters={clearFilters}
        />
      </header>

      <div className="mx-auto px-4">
        {filteredAndSortedFavorites.length > 0 ? (
          <div
            key="recipes"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 space-y-6 h-full"
                : "space-y-6 mx-auto"
            }
          >
            {filteredAndSortedFavorites.map((meal) => (
              <div
                key={meal.idMeal}
                className={`${
                  viewMode === "grid" ? "break-inside-avoid mb-6" : ""
                } group cursor-pointer`}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  navigate(`/recipe/${meal.idMeal}`);
                }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") navigate(`/recipe/${meal.idMeal}`);
                }}
              >
                <Card
                  className={`pt-2 px-2 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out rounded-2xl group-hover:bg-white/10 h-full flex ${
                    viewMode === "list" ? "flex-row pb-2" : "flex-col"
                  }`}
                >
                  <div
                    className={`relative group-hover:-translate-y-6 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                      viewMode === "list" ? "w-40 h-full" : "h-64"
                    }`}
                  >
                    <img
                      src={
                        meal.strMealThumb ||
                        "/placeholder.svg?height=400&width=300"
                      }
                      alt={meal.strMeal}
                      width={400}
                      height={320}
                      loading="lazy"
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                        viewMode === "list" ? "h-full" : "h-80"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {viewMode === "grid" && (
                      <>
                        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                          <Button
                            size="sm"
                            onClick={(e) => handleFavorite(e, meal)}
                            className="bg-white/90 hover:bg-white backdrop-blur-md rounded-full p-2 shadow-lg border transition-all duration-700 ease-in-out hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-brand"
                          >
                            <Heart
                              className={`h-5 w-5 transition-all duration-500 ${
                                isFavorite(meal.idMeal)
                                  ? "fill-rose-500 text-rose-500 scale-110"
                                  : "text-gray-600 hover:text-rose-500"
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white/90 !hover:bg-white backdrop-blur-md rounded-full p-2 shadow-lg border transition-all duration-700 ease-in-out hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-brand"
                            onClick={(e) => handleShare(e, meal)}
                          >
                            <Share2 className="h-4 w-4 text-secondary" />
                          </Button>
                        </div>

                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <Badge className="bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                            <MapPin className="h-3 w-3 mr-1" />
                            {meal.strArea}
                          </Badge>
                          {meal.strTags && (
                            <Badge className="bg-white/95 text-rose-700 text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                              <Tag className="h-3 w-3 mr-1" />
                              {meal.strTags.split(",")[0].trim()}
                            </Badge>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <CardContent
                    className={`${viewMode === "list" ? "flex-1" : ""} p-2`}
                  >
                    <h4 className="mb-3 line-clamp-2 leading-tight">
                      {meal.strMeal}
                    </h4>
                    <p className="line-clamp-3 mb-4 opacity-80">
                      {viewMode === "list" ? (
                        <>
                          {meal.strInstructions.length > 120
                            ? `${meal.strInstructions.substring(0, 270)}...`
                            : meal.strInstructions}
                        </>
                      ) : (
                        <>
                          {meal.strInstructions.length > 120
                            ? `${meal.strInstructions.substring(0, 120)}...`
                            : meal.strInstructions}
                        </>
                      )}
                    </p>

                    <div className="flex items-center gap-x-2">
                      {viewMode === "list" && (
                        <>
                          <Badge variant="secondary">
                            <ChefHat className="h-3 w-3 mr-1" />
                            {meal.strCategory}
                          </Badge>
                          <Badge variant="secondary">
                            <MapPin className="h-3 w-3 mr-1" />
                            {meal.strArea}
                          </Badge>
                          {meal.strTags && (
                            <Badge variant="secondary">
                              <Tag className="h-3 w-3 mr-1" />
                              {meal.strTags.split(",")[0].trim()}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleFavorite(e, meal)}
                          >
                            <Heart
                              className={`h-5 w-5 transition-all duration-500 ${
                                isFavorite(meal.idMeal)
                                  ? "fill-rose-500 text-rose-500 scale-110"
                                  : "text-gray-600 hover:text-rose-500"
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleShare(e, meal)}
                          >
                            <Share2 className="h-4 w-4" /> Share
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
            <div className="flex flex-col items-center">
               <div className="bg-orange-100/10 p-6 rounded-full mb-6">
                  <Heart className="h-12 w-12 text-orange-600" />
                </div>
            </div>

            <h3>
              {searchTerm || filterCategory !== "all" || filterArea !== "all"
                ? "No matches found"
                : "No favorites yet"}
            </h3>

            <p>
              {searchTerm || filterCategory !== "all" || filterArea !== "all"
                ? "Try adjusting your search or filters to find more recipes."
                : "Start exploring delicious recipes and add them to your favorites to see them here."}
            </p>

            <div className="space-y-3 mt-4">
              {(searchTerm ||
                filterCategory !== "all" ||
                filterArea !== "all") && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full rounded-full border-rose-200 text-rose-700 hover:bg-rose-50 transition-all duration-500 bg-transparent"
                >
                  Clear Filters
                </Button>
              )}
              <Link to="/search">
                <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                  Discover Recipes
                </Button>
              </Link>
            </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
