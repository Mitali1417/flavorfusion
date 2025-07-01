import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full bg-background border rounded-t-3xl shadow-inner mt-10">
      <div className="container mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-x-2">
          <span className="text-xl !text-muted-foreground font-bold tracking-tight">Flavor Fusion</span>
          <span className="text-xs !text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex space-x-4 text-xs !text-muted-foreground mt-4 md:mt-0 font-body">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/saved-recipes">Saved Recipes</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 