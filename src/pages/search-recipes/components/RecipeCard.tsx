import React, { useMemo, useCallback } from "react";
import { Heart, Share2, Bookmark, Youtube, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Meal } from "@/types";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { TextToolTip } from "../../../components/shared/TextTooltip";
import { useRecipeActions } from "@/hooks/useRecipeActions";

interface RecipeCardProps {
  meal: Meal;
  layout?: "grid" | "list";
}

export const RecipeCard = React.memo(
  ({ meal, layout = "grid" }: RecipeCardProps) => {
    const navigate = useNavigate();

    const tags = useMemo(
      () =>
        meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
      [meal.strTags]
    );

    const { handleFavorite, handleSave, handleShare, isFavorite, isSaved } =
      useRecipeActions();

    const handleCardClick = useCallback(() => {
      navigate(`/recipe/${meal.idMeal}`);
    }, [navigate, meal.idMeal]);

    return (
      <div
        className={cn(
          "group cursor-pointer transition-all duration-500 ease-in-out"
        )}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleCardClick();
        }}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 -translate-y-7 hover:-translate-y-9 bg-white"
          )}
        >
          <img
            src={meal.strMealThumb || "/placeholder.svg"}
            alt={meal.strMeal}
            width={400}
            height={320}
            loading="lazy"
            // srcSet={meal.strMealThumb ? `${meal.strMealThumb}/small 400w, ${meal.strMealThumb}/medium 800w, ${meal.strMealThumb}/large 1200w` : undefined}
            className={cn(
              "w-full object-cover group-hover:scale-110 transition-transform duration-700",
              layout === "list" ? "h-full" : "h-80"
            )}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-secondary/20 group-hover:bg-secondary/50 group-hover:backdrop-blur-xs transition-all duration-500" />

          <div className="absolute top-4 right-4  flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <TextToolTip label="Add to Favorites">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleFavorite(e, meal)}
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-500 drop-shadow-lg ${
                    isFavorite(meal.idMeal)
                      ? "fill-rose-500 text-rose-500 scale-110"
                      : "text-slate-300 hover:text-rose-500"
                  }`}
                />
              </Button>
            </TextToolTip>
            <TextToolTip
              label={isSaved(meal.idMeal) ? "Remove from Saved" : "Save Recipe"}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleSave(e, meal)}
              >
                <Bookmark
                  className={cn(
                    "h-4 w-4 transition-all duration-500 drop-shadow-lg",
                    isSaved(meal.idMeal)
                      ? "fill-blue-300 text-blue-300"
                      : "text-slate-300"
                  )}
                />
              </Button>
            </TextToolTip>
            <TextToolTip label="Share Recipe">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(e, meal);
                }}
              >
                <Share2 className="h-4 w-4 text-slate-300 drop-shadow-lg" />
              </Button>
            </TextToolTip>
            <div className="flex flex-col gap-1">
              {meal.strYoutube && (
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(meal.strYoutube);
                  }}
                >
                  <Youtube className="text-white drop-shadow-lg" />
                </Button>
              )}
              {meal.strSource && (
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(meal.strSource);
                  }}
                >
                  <Link2 className="text-white drop-shadow-lg" />
                </Button>
              )}
            </div>
          </div>

          <div className="absolute max-w-[75%] w-full top-4 left-4 flex flex-wrap gap-2">
            {meal.strCategory && (
              <Badge variant={"secondary"}>{meal.strCategory}</Badge>
            )}
            <Badge variant={"secondary"}>{meal.strArea}</Badge>
            {tags.map((tag, i) => (
              <Badge key={i} variant={"secondary"}>
                {tag}
              </Badge>
            ))}
          </div>
          <h4 className="max-w-[90%] w-full absolute bottom-2 left-4 text-white font-bold !text-[22px] group-hover:!text-[24px] transition-all duration-500 mb-2 line-clamp-2">
            {meal.strMeal}
          </h4>
        </div>
      </div>
    );
  }
);
