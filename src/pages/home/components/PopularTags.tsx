import { Utensils, Soup, Salad } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

interface PopularTagsProps {
  onTagClick: (tag: string) => void
}

export const PopularTags = ({ onTagClick }: PopularTagsProps) => {
  const navigate = useNavigate();
  const popularTags = [
    {
      index: 1,
      name: "Chicken",
      icon: Utensils,
      color: "from-rose-500 to-pink-500",
      description: "Delicious chicken recipes",
      gradient: "from-amber-900 to-card",
      image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=240"

    },
    {
      index: 2,
      name: "Vegetarian",
      icon: Salad,
      color: "from-green-500 to-teal-500",
      description: "Plant-based goodness",
      gradient: "from-card to-amber-900",
      image: "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=240"

    },
    {
      index: 3,
      name: "Soup",
      icon: Soup,
      color: "from-amber-500 to-orange-500",
      description: "Warm & comforting soups",
      gradient: "from-amber-900 to-card",
      image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=240"

    },
    {
      index: 4,
      name: "Pasta",
      icon: Utensils,
      color: "from-purple-500 to-indigo-500",
      description: "Italian pasta dishes",
      gradient: "from-card to-amber-900",
      image: "https://images.pexels.com/photos/1256875/pexels-photo-1256875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=240"

    },
  ]

  return (
    <div className="w-full mt-12 select-nonea">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Popular Searches
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Discover recipes by popular categories and find your next favorite dish!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-6 mx-auto">
        {popularTags.map((tag, index) => {
          const Icon = tag.icon
          return (
            <div
              key={tag.name}
              className="group relative w-full"
              style={{
                animationDelay: `${index * 100}ms`,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Card
                onClick={() => { onTagClick(tag.name); navigate(`/search?tag=${tag.name}`) }}
                className={`relative border-0 w-full h-full sm:h-64  rounded-2xl p-0 flex ${tag.index % 2 !== 0 && "justify-end"} cursor-pointer border-transparent shadow-neo transition-all duration-500 overflow-hidden`}
              >
                <img
                  src={tag.image}
                  alt={tag.name}
                  loading="lazy"
                  className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute shadow-neo inset-0 bg-gradient-to-t ${tag.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>

                <div className="relative z-10 p-4">
                  <div
                    className={`w-16 h-16 rounded-xl shadow-neo bg-primary/30 backdrop-blur-3xl flex items-center justify-center mb-4 transform group-hover:scale-110 ${tag.index % 2 === 0 ? "group-hover:-rotate-3" : 'group-hover:rotate-3'} transition-all duration-500 neo-shadow`}
                  >
                    <Icon className="sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3
                    className="!text-md md:text-xl group-hover:text-3xl font-bold text-gray-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500"
                  >
                    {tag.name}
                  </h3>
                  <p
                    className={`text-primary text-xs md:text-sm mb-3 transform transition-all duration-500`}
                  >
                    {tag.description}
                  </p>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
