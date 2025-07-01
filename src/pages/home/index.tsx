import { useGlobalStore } from "@/store/useGlobalStore";
import { Hero } from "./components/Hero";
import { PopularTags } from "./components/PopularTags";
import { ExploreSection } from "./components/ExploreSection";
import { AISection } from "./components/AISection";
import { HowItWorks } from "./components/HowItWorks";
export default function HomePage() {
  const { setSearchTerm, clearFilters } = useGlobalStore();

  return (
    <div className="space-y-4 md:space-y-10 xl:space-y-20">
      <Hero />
      <ExploreSection />
      <AISection />
      <PopularTags
        onTagClick={(tag: string) => {
          clearFilters();
          setSearchTerm(tag);
        }}
      />
      <HowItWorks />
    </div>
  );
}
