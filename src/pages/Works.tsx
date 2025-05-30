import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Title component import removed
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Sort projects by id in descending order
  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);
  
  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tag || [])
    )
  ).sort();
  
  // Filter projects based on selected tags
  const filteredProjects = selectedTags.length > 0 
    ? sortedProjects.filter(project => 
        selectedTags.every(tag => project.tag?.includes(tag))
      )
    : sortedProjects;
  
  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    // Set document title
    document.title = "All Projects | Nekodan Haruno";
    
    const title = titleRef.current;
    const projectElements = projectRefs.current;
    
    if (!title || projectElements.some(el => !el)) return;
    
    // Animate title
    gsap.fromTo(title,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate projects
    projectElements.forEach((project, index) => {
      gsap.fromTo(project,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: project,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Show/hide back to top button based on scroll position
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="mx-auto mt-2 sm:mt-4 mb-8 sm:mb-16">
              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6">All Projects</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">Explore our complete portfolio of creative work spanning various categories.</p>
              
              {/* Tag Filter */}
              <div className="mt-6 md:mt-8 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h2 className="text-lg font-medium">Filter by tags:</h2>
                  {selectedTags.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedTags([])}
                      className="text-xs h-8"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pb-2 pr-2 custom-scrollbar">
                  {allTags.map(tag => (
                    <Badge 
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`text-sm py-1 px-3 cursor-pointer ${
                        selectedTags.includes(tag) 
                          ? 'bg-primary hover:bg-primary/80' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <div 
                    key={project.id}
                    ref={el => { projectRefs.current[index] = el; }}
                    className="project-card group"
                  >
                    <Link to={`/works/${project.title}`} className="block">
                      <div className="h-[30vh] md:h-[25vh] overflow-hidden rounded-2xl">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-start md:items-center">
                        <div className="flex-1 pr-2">
                          <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">{project.title}</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">{project.category}</p>
                          {project.tag && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {project.tag.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                              {project.tag.length > 3 && (
                                <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded-full">
                                  +{project.tag.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="bg-secondary w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16">
                  <p className="text-xl text-muted-foreground">No projects match the selected filters.</p>
                </div>
              )}
            </div>
            
            <div className="text-center mt-16">
              <Button variant="outline" size="lg" asChild>
                <Link to="/#featured">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
        
        {/* Back to Top Button */}
        {showBackToTop && (
          <button 
            onClick={scrollToTop} 
            className="fixed bottom-4 right-4 bg-secondary w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up"><path d="M12 19V6"/><path d="m5 12 7-7 7 7"/></svg>
          </button>
        )}
      </div>
    </>
  );
}
