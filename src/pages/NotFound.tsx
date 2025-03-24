
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md animate-fade-in px-4">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Film className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the dashboard.
        </p>
        <Button 
          onClick={() => window.location.href = "/"}
          className="px-6"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
