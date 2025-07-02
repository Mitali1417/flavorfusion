
export default function RecipeGridSkeleton() {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="break-inside-avoid mb-6">
          <div className="bg-card rounded-3xl shadow-lg h-96 flex flex-col">
            <div className="h-48  bg-card-foreground/5 rounded-t-3xl" />
            <div className="flex-1 p-6 flex flex-col">
              <div className="h-6 bg-card-foreground/5 rounded w-2/3 mb-4" />
              <div className="h-4 bg-card-foreground/5 rounded w-full mb-2" />
              <div className="h-4 bg-card-foreground/5 rounded w-5/6 mb-2" />
              <div className="h-4 bg-card-foreground/5 rounded w-1/2 mb-4" />
              <div className="flex-1" />
              <div className="h-8 bg-card-foreground/5 rounded w-1/2 mt-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 