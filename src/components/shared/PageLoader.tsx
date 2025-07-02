
export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex justify-center items-center animate-spin rounded-full h-12 w-12 border-t-6 border-b-6 border-primary">
          <div className="animate-spin rounded-full h-10 w-10 border-r-6 border-l-6"></div>
        </div>
      </div>
    </div>
  );
} 