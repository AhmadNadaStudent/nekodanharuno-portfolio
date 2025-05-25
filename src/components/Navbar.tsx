import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import AppLogoIcon from '@/components/ui/app-logo-icon';
import AppLogo from '@/components/ui/app-logo';
import { ThemeToggle } from '@/components/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const navElement = navRef.current;
    
    if (!navElement) return;
    
    gsap.fromTo(navElement, 
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out",
        delay: 1
      }
    );
    
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const scrollDirection = self.direction;
        
        if (scrollDirection === 1) {
          gsap.to(navElement, { y: -100, duration: 0.3, ease: "power2.inOut" });
        } else {
          gsap.to(navElement, { y: 0, duration: 0.3, ease: "power2.inOut" });
        }
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Smooth scroll function for HashLink
  const scrollWithOffset = (el: HTMLElement) => {
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
    const elementPosition = el.offsetTop - navbarHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth"
    });
  };
  
  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 backdrop-blur-sm bg-background/70 border-b border-border/50">
      <div className="flex items-center">
        <div className="w-1/4">
              <Link to="/#home" className="font-display text-xl font-semibold">
                <AppLogo className="h-8 w-auto" />
              </Link>
        </div>          
        <div className="hidden md:flex justify-center w-1/2 space-x-10">
            <Link to="/works" className="hover:text-primary transition-colors">Works</Link>
            <HashLink 
              to="/#about" 
              scroll={scrollWithOffset}
              className="hover:text-primary transition-colors"
            >
              About
            </HashLink>
            <HashLink 
              to="/#contact" 
              scroll={scrollWithOffset}
              className="hover:text-primary transition-colors"
            >
              Contact
            </HashLink>
        </div>
        
        <div className="flex items-center justify-end w-1/4 space-x-4">
          <ThemeToggle />
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;