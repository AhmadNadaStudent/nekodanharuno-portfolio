import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Filter to only include featured projects and sort by id in descending order
  const featuredProjects = projects
    .filter(project => project.featured === true)
    .sort((a, b) => b.id - a.id);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const projectElements = projectRefs.current;
    
    if (!section || !title || projectElements.some(el => !el)) return;
    
    // Animate title
    gsap.fromTo(title,
      { y: 50, opacity: 0 },
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
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: project,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-16">
      <div className="container px-4 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-16">Featured Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => { projectRefs.current[index] = el; }}
              className="project-card group"
            >              
            <Link to={`/works/${project.title}`} className="block">
                <div className="h-[60vh] overflow-hidden rounded-2xl">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.category}</p>
                  </div>
                  <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-center mt-16">
            <Button 
              variant="outline" 
              asChild
              className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition-colors"
            >
              <Link to="/works">
                View All Projects
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;