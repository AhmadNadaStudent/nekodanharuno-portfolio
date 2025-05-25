import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import AppLogoIcon from './ui/app-logo-icon';

// Register the TextPlugin with GSAP
gsap.registerPlugin(TextPlugin);

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  
  useEffect(() => {
    // Simulate loading progress
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".loading-screen", {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete
        });
      }
    });
    
    // Animate the progress bar
    tl.to(".progress-bar-fill", {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        // Calculate progress percentage (0-100)
        progressRef.current = Math.round(this.progress() * 100);
        setProgress(progressRef.current);
        
        // Update the text element directly
        const progressTextElement = document.querySelector(".progress-text");
        if (progressTextElement) {
          progressTextElement.textContent = `${progressRef.current}%`;
        }
      }
    });    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
    return (
    <div className="loading-screen fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* Background image with SVG */}
      {/* <div className="absolute inset-0 z-0 flex items-center justify-center opacity-25">
        <img src="/Nekodan.svg" alt="Nekodan Logo" className="max-w-[36rem] object-contain" />
      </div> */}
      
      {/* Content (on top of the background) */}
      <div className="z-10 flex flex-col items-center justify-center">
        <AppLogoIcon className="h-12 w-auto mb-4" />
        <div className="text-2xl font-semibold mb-6">Loading Portfolio Page</div>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="progress-bar-fill h-full bg-primary rounded-full" style={{ width: "0%" }}></div>
        </div>
        <div className="progress-text text-sm mt-2">{progress}%</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
