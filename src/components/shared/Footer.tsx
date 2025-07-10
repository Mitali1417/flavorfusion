import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full bg-background border rounded-t-3xl shadow-inner max-w-[1400px] mx-auto select-none">
      <div className="container mx-auto py-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center space-x-2">
          <span className="sm:text-xl !text-muted-foreground font-bold tracking-tight">
            Flavor Fusion
          </span>
          <span className="text-xs !text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <span className="text-xs !text-muted-foreground">
          Made with 🤍 by <Link to="https://www.linkedin.com/in/mitali-25372722b/" target="_blank" className="hover:text-muted">Mitali</Link>
        </span>

        <div className="flex space-x-4 !text-xs !text-muted-foreground font-body">
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
