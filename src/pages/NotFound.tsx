import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Set document title
    document.title = "404 Not Found | Nekodan Haruno";
    
    // Log the error with more context for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "Referred from:",
      document.referrer
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md p-6 text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
          <p className="text-muted-foreground mb-6">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="px-8">
              <Link to="/">Go home</Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="px-8"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
