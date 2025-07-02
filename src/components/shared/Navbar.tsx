import { Heart, Home, Bookmark, LogOut, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";

const primaryLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Search Recipes",
    href: "/search",
    icon: Search,
  },
];

const secondaryLinks = [
  {
    name: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    name: "Saved Recipes",
    href: "/saved-recipes",
    icon: Bookmark,
  },
];

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const avatar = localStorage.getItem("avatar");
  return (
    <nav className="w-full bg-muted-foreground backdrop-blur-xl shadow-md fixed top-2 left-0 right-0 z-50 max-w-max mx-auto rounded-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-body">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`group flex items-center space-x-1 transition-all duration-500 ease-in-out hover:scale-110 text-white/60 hover:text-white active:text-white p-2 rounded-full ${
                pathname === link.href && "text-white"
              }`}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}

          <Button
            onClick={() => navigate("/generate-recipes")}
            variant="gradient"
            className="!text-xs"
          >
            <Sparkles className="h-5 w-5 sm:mr-1" />
            <span className="text-white hidden sm:inline">Let’s Cook</span>
          </Button>

          {secondaryLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`group flex items-center space-x-1 transition-all duration-500 ease-in-out hover:scale-110 text-white/60 hover:text-white active:text-white p-2 rounded-full ${
                pathname === link.href && "text-white"
              }`}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}

          <div className="flex items-center gap-2">
            {isAuthenticated() && (
              <>
                <Link
                  to="/profile"
                  className="w-8 h-8 ml-2 flex items-center justify-center text-center rounded-full bg-card/60  mr-1 hover:scale-110 transition-all duration-500 ease-in-out"
                >
                  {avatar ? (
                    <div className="flex items-center justify-center text-center w-full h-full object-cover">
                      <span role="img" aria-label="avatar">
                        {avatar}
                      </span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center text-center text-white leading-relaxed w-full h-full object-cover">
                      {user?.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </Link>

                <Dialog>
                  <DialogTrigger
                    className={`group flex items-center  space-x-1 transition-all duration-500 ease-in-out hover:scale-110 text-white/60 hover:text-white cursor-pointer p-2 rounded-full`}
                  >
                    <LogOut className="h-4 w-4" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center justify-center">
                    <div className="bg-primary/60 rounded-full w-fit mx-auto p-5">
                      <LogOut className="text-primary h-10 w-10" />
                    </div>
                    <div className="text-center">
                      <h4>Logout</h4>
                      <p>Are you sure you want to log out?</p>
                    </div>
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        logout();
                        navigate("/signin");
                        toast.success("Logged out. You have been signed out.");
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
