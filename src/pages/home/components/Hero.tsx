import { ParallexBg } from "@/components/shared/ParallexBg";
import { ChefHat, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative select-none">
      <div
        className={`hero-parallax-wrapper shadow-neo w-full shadow-2xl relative overflow-hidden rounded-xl md:rounded-[6rem] rounded-tr-[0] md:rounded-tr-[0]`}
      >
        <ParallexBg imgSrc="https://cdn.pixabay.com/photo/2022/02/10/05/45/lantern-7004643_1280.jpg" />

        <div
          className={`absolute md:w-[75%] bottom-[2rem] md:bottom-[7rem] z-[5] px-4 sm:px-10`}
        >
          <div className="flex flex-wrap gap-2 mb-2">
            <Link
              to="/generate-recipes"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-foreground hover:bg-primary-foreground/60 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-all duration-500 ease-in-out"
            >
              <ChefHat className="group-hover:rotate-6 group-hover:scale-110 w-4 h-4 text-amber-400" />
              <span className=" text-sm font-medium text-white">
                Get a Recipe
              </span>
            </Link>
            <Link
              to="/search"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-foreground/30 hover:bg-accent-foreground/20 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-all duration-500 ease-in-out"
            >
              <span className="text-sm font-medium text-white">
                Discover Amazing Recipes
              </span>
              <MoveRight className="w-4 h-4 text-white group-hover:translate-x-2 transition-transform duration-500 ease-in-out" />
            </Link>
          </div>
          <h1 className="text-gradient-1 drop-shadow-2xl !text-5xl md:!text-[100px] xl:!text-[130px] font-black leading-none">
            <span className="!text-5xl md:!text-[100px] xl:!text-[130px] font-black font-playfair-display text-white">
              flavor
            </span>
            fusion
          </h1>
          <p className="mt-2 text-xs md:text-sm">
            Create, curate, and cook extraordinary flavors that bring people
            together
            {/* Savor the magic on every plate, where crispy meets
            excitement! */}
          </p>
        </div>
        <div
          className={`absolute blur-3xl -bottom-[5.5rem] -left-[5rem] w-screen h-[20rem] bg-[#111720]/90`}
        />
      </div>
    </section>
  );
};
