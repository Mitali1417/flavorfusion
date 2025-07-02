import { lazy } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.default }))
);
const GenerateRecipePage = lazy(() =>
  import("@/pages/generate-recipe").then((m) => ({ default: m.default }))
);
const FavoritesPage = lazy(() =>
  import("@/pages/favorites").then((m) => ({
    default: m.FavoritesPage || m.default,
  }))
);
const SavedRecipesPage = lazy(() =>
  import("@/pages/saved-recipes").then((m) => ({ default: m.default }))
);
const SearchRecipesPage = lazy(() =>
  import("@/pages/search-recipes").then((m) => ({ default: m.default }))
);
const RecipePage = lazy(() =>
  import("@/pages/recipe").then((m) => ({ default: m.default }))
);
const ProfilePage = lazy(() =>
  import("@/pages/profile").then((m) => ({ default: m.default }))
);
const UserLayout = lazy(() =>
  import("@/layouts/UserLayout").then((m) => ({ default: m.default }))
);
const JoinPage = lazy(() =>
  import("@/pages/join").then((m) => ({ default: m.default }))
);

const NotFound = () => (
  <div className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center overflow-hidden">
    <div className="flex flex-col items-center justify-center">
      <span className="flex items-center justify-center text-6xl text-white font-bold mb-4">
        4<h2 className="h-16 w-16 rotate-90 text-white flex items-center justify-center border-2 border-white rounded-full pb-1.5">:(</h2>4
      </span>
      <span className="text-white font-light">Not Found</span>
    </div>
  </div>
);

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() && location.pathname !== "/join") {
      navigate("/join");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/join" element={<JoinPage />} />
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-recipes" element={<GenerateRecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
        <Route path="/search" element={<SearchRecipesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
