import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import PageLoader from "@/components/shared/PageLoader";

export default function JoinPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleGuestJoin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-x-hidden overflow-y-auto h-full">
      <div className="flex lg:flex-1 flex-row-reverse gap-4 lg:flex-col items-center justify-center p-8 text-center bg-primary-foreground">
        <div className="text-left lg:text-center">
          <h1>Flavor Fusion</h1>
          <p className="mb-6">
            Discover, save, and create amazing recipes. <br />
            <span className="hidden sm:block">
              Your culinary journey starts here!
            </span>
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg"
          alt="Cooking Illustration"
          className="max-w-full w-24 h-24 sm:w-36 sm:h-36 lg:w-96 lg:h-96 neo-shadow object-cover rounded-xl"
        />
      </div>
      <Suspense fallback={<PageLoader />}>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-center mb-4">
                Join as Guest
              </h2>
              <p className="text-center mb-6">
                Start exploring and saving recipes instantly. No account
                required!
              </p>
              <Button className="w-full" onClick={handleGuestJoin}>
                Join as Guest
              </Button>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
