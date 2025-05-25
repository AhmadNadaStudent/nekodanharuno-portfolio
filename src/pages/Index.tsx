import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import VideoShowcase from '../components/VideoShowcase';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LoadingAnimation from '../components/LoadingAnimation';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const location = useLocation();
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set document title
    document.title = "Nekodan Haruno | Movie Director & Junior Web Developer";
    
    // Check if device is touch/mobile device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobileDevice(isTouchDevice);
    
    // Check if URL has a hash
    const hasHash = location.hash !== '';
    
    // Skip loading if URL has hash, otherwise preload resources
    if (hasHash) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.hash]);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {isLoading && !location.hash && <LoadingAnimation onComplete={handleLoadingComplete} />}
      
      <div className={`min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <VideoShowcase />
        <div id="about" ref={aboutRef}>
          <AboutSection />
        </div>
        <div id="contact" ref={contactRef}>
          <ContactSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
