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
          <div ref={heroRef} className="w-full h-[70vh] relative overflow-hidden">
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div ref={contentRef} className="container px-4 mx-auto py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Overview</h2>
              {project.youtubeId && (
                <div className="mb-8 aspect-video w-full">
                  <iframe 
                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                    title={`${project.title} video`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              <p className="text-lg mb-8">
                {project.description}
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-4">Date Completed : {project.date}</h3>
              </div>
              
              <div className="bg-secondary/20 p-8 rounded-lg mb-12">
                <h3 className="text-xl font-semibold mb-4">Tag</h3>
                <div className="flex flex-wrap gap-2">
                    {project.tag && project.tag.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                    ))}
                </div>
              </div>
                <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
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
                          className="w-full h-128 object-cover rounded-lg hover:opacity-90 transition-opacity" 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No gallery images available for this project.</p>
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
        <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full bg-black/90">
            <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            </DialogClose>
            <div className="flex items-center justify-center h-full p-4">
              {selectedImage && (
                <img 
                  src={selectedImage} 
                  alt="Gallery Image" 
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
