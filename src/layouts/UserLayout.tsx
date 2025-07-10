import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import PageLoader from "@/components/shared/PageLoader";
import { useGlobalStore } from "../store/useGlobalStore";

export default function UserLayout() {
  const initializeStore = useGlobalStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <>
      <div className="flex flex-col min-h-screen max-w-[1400px] mx-auto px-4 md:px-20 mt-24 overflow-x-hidden">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <main>
            <Outlet />
          </main>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
