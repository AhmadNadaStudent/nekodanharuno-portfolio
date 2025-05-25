import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import AppLogoIcon from '@/components/ui/app-logo-icon';
import AppLogo from '@/components/ui/app-logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
        
        // Don't hide navbar when mobile menu is open
        if (isMenuOpen) return;
        
        if (scrollDirection === 1) {
          gsap.to(navElement, { y: -100, duration: 0.3, ease: "power2.inOut" });
        } else {
          gsap.to(navElement, { y: 0, duration: 0.3, ease: "power2.inOut" });
        }
      }
    });
    
    // Disable body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 backdrop-blur-sm bg-background/70 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex-none">
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
          
          <div className="flex-none flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 pr-[6rem] backdrop-blur-md bg-background/95 flex flex-col items-end justify-center transition-opacity duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-end space-y-4 text-2xl">
          <Link 
            to="/works" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Works
          </Link>
          <HashLink 
            to="/#about" 
            scroll={scrollWithOffset}
            className="hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </HashLink>
          <HashLink 
            to="/#contact" 
            scroll={scrollWithOffset}
            className="hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </HashLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;