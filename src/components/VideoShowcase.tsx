import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    
    if (!section || !video || !title || !desc) return;
    
    // Animate video parallax
    gsap.fromTo(video,
      { y: 100, scale: 0.9 },
      {
        y: -50,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
    
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
    
    // Animate description
    gsap.fromTo(desc,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: desc,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 overflow-hidden">
      <div className="container px-4 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-6 text-center">Director's Reel</h2>
        <p ref={descRef} className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Thank you to everyone who has placed their trust in me. <br />
          Join me on this creative journey and see yourself in next year's showcase!
        </p>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <iframe
            ref={videoRef}
            className="w-full h-full absolute top-0 left-0"
            src="https://www.youtube.com/embed/zgZjJiSd0Xo"
            title="Nekodan Haruno - Director's Reel 2024"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
