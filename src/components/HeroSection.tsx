import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const bgImage = bgImageRef.current;
    
    if (!section || !heading || !subtitle || !bgImage) return;
    
    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate SVG background
    tl.fromTo(bgImage,
      { opacity: 0, scale: 1.1 },
      { opacity: 0.15, scale: 1, duration: 1.8 }
    );
    
    // Animate heading
    tl.fromTo(heading, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2 },
      "-=1.2"
    );
    
    // Animate subtitle
    tl.fromTo(subtitle,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

  }, []);  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-50"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-[1]"></div>
      </div>
      
      {/* Background SVG that follows theme */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[2] flex items-center justify-center">
        <img 
          ref={bgImageRef}
          src="/Nekodan.svg" 
          alt="Nekodan Logo"
          className="w-4/5 max-w-[36rem] -rotate-[8deg] opacity-0 filter transition-colors duration-300 dark:invert-[0.8] dark:hue-rotate-180"
        />
      </div>
      
      <div className="container text-center px-4 relative z-10">
        <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 max-w-5xl mx-auto leading-tight">
          MV DIRECTOR <br />
          <span className="text-primary">WEB DEVELOPER</span>
        </h1>
        <p ref={subtitleRef} className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
          Hi, I'm Nekodan Haruno, a freelance MV / PV editor. <br /> I'm also a junior web developer.
        </p>
      </div>
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm uppercase tracking-wider">Scroll Down</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
