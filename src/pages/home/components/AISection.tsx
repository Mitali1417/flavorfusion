import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AISection = () => {
  return (
    <Card className="relative lg:py-16 lg:px-10 bg-primary/20 backdrop-blur-sm rounded-3xl select-none">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-4">
          <div className="flex flex-row lg:flex-col items-center justify-center space-y-8">
            <div className="lg:mb-6">
              <h2 className="max-w-xs">
                Craving
                <span className="text-3xl md:text-4xl bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  {""} Something {""}
                </span>
                New?
              </h2>
            </div>
            <div
              className={`w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 drop-shadow-2xl ml-4`}
            >
              <img
                src="/c1.webp"
                loading="lazy"
                className={`rounded-full h-full w-full object-cover shadow-2xl`}
                alt="ai-image"
              />
            </div>
          </div>

          <div className="relative space-y-2">
            <Card className="relative group p-8 bg-gradient-to-br from-card via-card/60 to-card rounded-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">You:</p>
                  <p className="text-gray-400">
                    "curd, onion, garlic, chicken"
                  </p>
                </div>
                <div
                  className={`bg-primary/30 rounded-2xl p-4 border border-primary/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/10`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary animate-spin" />
                    <p className="text-primary text-sm">AI Chef:</p>
                  </div>
                  <p className="text-gray-300">
                    Perfect! I'm creating a Mediterranean Herb-Crusted Chicken
                    with Roasted Rainbow Vegetables...
                  </p>
                  <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-muted to-primary h-full rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <Link
                to="/generate-recipes"
                className={`group w-fit mx-auto lg:w-full bg-gradient-2 text-white font-semibold !py-4 px-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer`}
              >
                <Wand2 className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                <span className="text-white">Start Cooking Magic</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </Card>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-muted/20 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};
