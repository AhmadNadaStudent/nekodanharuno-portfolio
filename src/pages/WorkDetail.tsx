import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface Props {
  id: string;
}

export default function WorkDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.title === id);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // If project doesn't exist, redirect to 404 page
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    // Set document title based on project
    document.title = `${project.title} | Nekodan Haruno`;
    
    const hero = heroRef.current;
    const content = contentRef.current;
    
    if (!hero || !content) return;
    
    gsap.fromTo(hero,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    gsap.fromTo(content,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
    );
    
    return () => {
      // Cleanup function
    };
  }, []);

  const openImageView = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero Section */}
          <div ref={heroRef} className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] relative overflow-hidden">
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-4">
              <div className="text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div ref={contentRef} className="container px-4 mx-auto py-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Project Overview</h2>
              {project.youtubeId && (
                <div className="mb-8 aspect-video w-full">
                  <iframe 
                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                    title={`${project.title} video`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              )}
              
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                {project.description}
              </p>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Date Completed: {project.date}</h3>
              </div>
              
              <div className="bg-secondary/20 p-4 sm:p-8 rounded-lg mb-8 sm:mb-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {project.tag && project.tag.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm sm:text-base"
                    >
                      {tag}
                    </span>
                    ))}
                </div>
              </div>
                <div className="mb-8 sm:mb-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Project Gallery</h3>
                {project.gallery && project.gallery.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {project.gallery?.map((image, index) => (
                      <div 
                        key={index} 
                        className="cursor-pointer transition-all duration-300 hover:shadow-xl" 
                        onClick={() => openImageView(image)}
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} gallery image ${index + 1}`}
                          className="w-full h-auto object-cover rounded-lg hover:opacity-90 transition-opacity" 
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No gallery images available for this project.</p>
                )}
              </div>
              
              <div className="text-center">
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/works">Back to Works</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Image View Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[90vw] h-[90vh] max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full bg-black/90">
            <DialogClose className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span className="sr-only">Close</span>
            </DialogClose>
            <div className="flex items-center justify-center h-full p-2 sm:p-4">
              {selectedImage && (
                <img 
                  src={selectedImage} 
                  alt="Gallery Image" 
                  className="max-w-full max-h-[80vh] object-contain"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
