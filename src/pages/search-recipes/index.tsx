import { useEffect, useState, useRef, useCallback } from "react";
import { RecipeCard } from "./components/RecipeCard";
import { Filters } from "./components/Filters";
import { SearchBar } from "./components/SearchBar";
import { useGlobalStore } from "../../store/useGlobalStore";
import type { Meal } from "../../types";
import { useAllRecipes } from "@/hooks/useAllRecipes";
import PageLoader from "@/components/shared/PageLoader";
import RecipeGridSkeleton from "@/components/shared/RecipeGridSkeleton";
import { ChefHat, Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchRecipes() {
  const {
    searchTerm,
    selectedCategory,
    selectedArea,
    selectedIngredient,
    selectedLetter,
    setSearchTerm,
    clearFilters,
  } = useGlobalStore();

  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([]);
  const pageSize = 12;
  const loadingMoreRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const {
    meals,
    categories,
    areas,
    ingredients,
    loadingMeals,
    loadingCategories,
    loadingAreas,
    loadingIngredients,
  } = useAllRecipes({
    searchTerm,
    selectedCategory,
    selectedArea,
    selectedIngredient,
    selectedLetter,
  });

  const updateMeals = useCallback(
    (newMeals: Meal[]) => {
      setAllMeals(newMeals);
      setDisplayedMeals(newMeals.slice(0, pageSize));
    },
    [pageSize]
  );

  useEffect(() => {
    updateMeals(meals);
  }, [meals, updateMeals]);

  useEffect(() => {
    const handleScroll = () => {
      if (loadingMoreRef.current || loadingMore) return;
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        displayedMeals.length < allMeals.length
      ) {
        loadingMoreRef.current = true;
        setLoadingMore(true);
        setTimeout(() => {
          setDisplayedMeals((prev) => [
            ...prev,
            ...allMeals.slice(prev.length, prev.length + pageSize),
          ]);
          loadingMoreRef.current = false;
          setLoadingMore(false);
        }, 200);
      }
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedMeals.length, allMeals.length, loadingMore, pageSize, allMeals]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, [setSearchTerm]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedArea !== "all" ||
    selectedIngredient !== "all" ||
    selectedLetter !== "all";
  const hasSearchTerm = searchTerm.trim() !== "";
  const isActiveSearch = hasSearchTerm && !hasActiveFilters;
  const isActiveFilters = hasActiveFilters;

  if (
    loadingCategories ||
    loadingAreas ||
    loadingIngredients ||
    (loadingMeals && allMeals.length === 0)
  ) {
    return <PageLoader />;
  }

  const showSkeleton = loadingMeals && allMeals.length > 0;

  return (
    <div>
      <Card className="mb-2 md:mb-4 w-fit mx-auto">
        <CardContent>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <Filters
            categories={categories}
            areas={areas}
            ingredients={ingredients}
          />
          {(isActiveSearch || isActiveFilters) && (
            <div className="flex justify-center mt-2">
              <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                {isActiveSearch ? (
                  <>
                    <Search className="h-4 w-4 text-rose-600" />
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700"
                    >
                      {searchTerm}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleClearSearch}
                      className="h-6 w-6 p-0 rounded-full text-rose-600 hover:text-rose-700"
                      title="Clear search"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">Active filters: </span>
                    {selectedCategory !== "all" && (
                      <Badge variant="secondary">{selectedCategory}</Badge>
                    )}
                    {selectedArea !== "all" && (
                      <Badge variant="secondary">{selectedArea}</Badge>
                    )}
                    {selectedIngredient !== "all" && (
                      <Badge variant="secondary">{selectedIngredient}</Badge>
                    )}
                    {selectedLetter !== "all" && (
                      <Badge variant="secondary">
                        Letter: {selectedLetter.toUpperCase()}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={clearFilters}
                      className="h-6 w-6 p-0 rounded-full"
                      title="Clear filters"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="container mx-auto py-8">
        {showSkeleton ? (
          <RecipeGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 space-y-6">
            {displayedMeals.length > 0 ? (
              displayedMeals.map((meal) => (
                <div key={meal.idMeal}>
                  <RecipeCard meal={meal} layout="grid" />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center pb-10">
                <div className="flex flex-col items-center">
                  <div className="bg-orange-100/10 p-6 rounded-full mb-6">
                    <ChefHat className="h-12 w-12 text-orange-600" />
                  </div>
                </div>
                <p className="text-xl font-medium">No recipes found</p>
                <p>Try adjusting your search or explore our collections</p>
              </div>
            )}
          </div>
        )}

        {loadingMore && (
          <div
            className="flex justify-center py-8"
            aria-live="polite"
            aria-busy="true"
          >
            <div
              className="animate-spin rounded-full h-10 w-10 border-4 border-brand border-t-transparent"
              aria-label="Loading more recipes"
            ></div>
          </div>
        )}

        {!loadingMore &&
          displayedMeals.length >= allMeals.length &&
          allMeals.length > 0 && (
            <div
              className="text-center text-brand-dark font-semibold py-8"
              tabIndex={0}
              aria-live="polite"
            >
              No more recipes to load.
            </div>
          )}

        {showBackToTop && (
          <button
            className="fixed bottom-8 right-8 z-50 bg-card text-white rounded-full p-3 shadow-lg"
            style={{ transition: "opacity 0.3s" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}
