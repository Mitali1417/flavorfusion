import { Sparkles, Star, Clock, ChefHat, Utensils, Heart, Quote } from "lucide-react"
import { Link } from "react-router-dom";

export const ExploreSection = () => {
  return (
    <section className="relative">
      <div className="mx-auto px-4 pt-10 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Quote className="-ml-1 w-16 h-16 text-primary/20 rotate-180" />
              <h2>
                Explore the World of Culinary Delights
              </h2>
              <p className=" font-light leading-relaxed max-w-lg">
                Create, curate, and cook extraordinary flavors that bring people together
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search" className="group border-2 text-primary px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2">
                <Utensils className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                Explore Recipes
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/30 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-secondary/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012_1280.jpg"
                    alt="Delicious Recipe"
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <Heart className="w-5 h-5 text-rose-500" />
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-card rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/17597409/pexels-photo-17597409.jpeg"
                        alt="Recipe"
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        NEW
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg">Fusion Delight</h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-amber-400" />
                          <span className="font-semibold">4.8</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>25 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-36 h-max bg-card rounded-3xl shadow-2xl p-4 rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-110 group">
              <img
                src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg"
                alt="Recipe 2"
                className="w-full h-20 object-cover rounded-2xl mb-2"
              />
              <div className="text-center">
                <div>Pasta Special</div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                  <Star className="h-3 w-3 fill-current text-amber-400" />
                  <span className="text-xs">4.9</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-foreground to-secondary w-6 h-6 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
            </div>
            <div className="hidden sm:absolute -bottom-16 right-8 w-32 h-32 bg-card rounded-3xl shadow-2xl p-4 -rotate-12 hover:-rotate-6 transition-all duration-500 hover:scale-110 group">
              <img
                src="https://images.pexels.com/photos/27672710/pexels-photo-27672710.jpeg"
                alt="Recipe 3"
                className="w-full h-16 object-cover rounded-2xl mb-2"
              />
              <div className="text-center">
                <div className="text-xs">Sweet Treat</div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                  <Star className="h-3 w-3 fill-current text-amber-400" />
                  <span className="text-xs">4.7</span>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-primary-foreground to-secondary w-6 h-6 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-primary" />
              </div>
            </div>
            <div className="absolute top-1/2 -left-8 w-24 h-24 bg-gradient-to-br from-primary-foreground to-secondary rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-500">
              <ChefHat className="animate-pulse w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
