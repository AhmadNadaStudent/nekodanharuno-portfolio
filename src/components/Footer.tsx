import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import AppLogo from './ui/app-logo';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const footer = footerRef.current;
    
    if (!footer) return;
    
    gsap.fromTo(footer.querySelector('.footer-content'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="py-16 bg-secondary/20">
      <div className="container px-4 mx-auto">
        <div className="footer-content">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <Link to="/" className="font-display text-xl font-semibold inline-block">
                <AppLogo className="h-8 w-auto" />
              </Link>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">Movie Director & Junior Web Developer</p>
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="mailto:harunowildan@gmail.com" className="hover:text-primary transition-colors duration-300" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
              <a href="https://www.instagram.com/nekodanharuno" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://x.com/HarunoWildan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300" aria-label="Twitter/X">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@WildanAX/featured" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
