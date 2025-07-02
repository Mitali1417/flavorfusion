/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"
import {
  Heart,
  Globe,
  Tag,
  ChevronLeft,
  ChefHat,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/hooks/useFavorites"
import { Button } from "@/components/ui/button"
import { RecipeInstructions } from "@/pages/recipe/components/RecipeInstructions"
import { RecipeIngredients } from "@/pages/recipe/components/RecipeIngredients"

export default function Recipe({ meal, ingredients, instructions }: any) {
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!meal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-12 h-12 text-rose-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-500">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-200"></div>
        <Sparkles className="absolute top-32 left-1/4 w-6 h-6 text-rose-300 animate-pulse" />
        <Sparkles className="absolute bottom-32 right-1/3 w-4 h-4 text-orange-300 animate-bounce delay-300" />
      </div> */}


      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Recipe Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-orange-500/30 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20 group-hover:shadow-3xl transition-all duration-500">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={meal.strMealThumb || "/placeholder.svg?height=400&width=600"}
                      alt={meal.strMeal}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(meal.idMeal)}
                        className="bg-white/70 hover:bg-white/60 rounded-full p-3 transition-all duration-500 hover:scale-110"
                      >
                        <Heart
                          className={`h-5 w-5 transition-all duration-500 ${isFavorite(meal.idMeal)
                            ? "fill-rose-500 text-rose-500 scale-110"
                            : "text-gray-600 hover:text-rose-500"
                            }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge>
                      <Globe className="h-4 w-4 mr-2" />
                      {meal.strArea}
                    </Badge>
                    <Badge>
                      <Tag className="h-4 w-4 mr-2" />
                      {meal.strCategory}
                    </Badge>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {meal.strMeal}
                  </h1>

                  <p>
                    A delicious {meal.strArea} {meal.strCategory.toLowerCase()} recipe that brings authentic flavors to
                    your kitchen. Perfect for any occasion!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 pt-4 pb-12">
        <RecipeIngredients
          ingredients={ingredients}
        />
        <RecipeInstructions instructions={instructions} />
      </section>

    </div>
  )
}
