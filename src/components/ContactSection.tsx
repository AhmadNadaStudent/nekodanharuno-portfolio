import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    
    if (!section || !title || !form || !info) return;
    
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
    
    // Animate form
    gsap.fromTo(form,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: form,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate info
    gsap.fromTo(info,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: info,
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
    <section ref={sectionRef} id="contact" className="py-32">
      <div className="container px-4 mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-16 text-center">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div>
              <h3 className="text-xl font-semibold ">Contact Information</h3>
              <p className="text-muted-foreground mb-12">Feel free to reach out for collaborations, projects or just to say hello!</p>
            </div>
            <div className="space-y-4">              
              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:harunowildan@gmail.com" className="hover:text-primary">harunowildan@gmail.com</a>
              </div>
                
              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <a href="https://x.com/HarunoWildan" target="_blank" rel="noopener noreferrer" className="hover:text-primary">@HarunoWildan</a>
                </div>
              
                  <div className="flex items-center space-x-4">                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="24" height="24" className="text-primary">
                      <path fill="currentColor" d="M76.99,82c6.36-54.04,71.28-65.74,99.81-19.3,15.64,25.46,7.98,38.17-8.4,59.2-26.32,33.79-58.03,57.21-99.53,29.73-13.04-8.64-45.1-40.14-49.37-54.63-7.91-26.84,23.98-47.55,45.02-29.02,4.78,4.21,7.18,10.35,12.47,14.02ZM118.76,48.26c-22.39,3.07-34.45,29.33-24.64,49.12,3.5,7.06,11.67,14.11,16.86,20.12-3.96,3.88-9.63,5.44-15.02,4.03-7.77-2.03-22.64-15.44-28.48-21.51-4.79-4.97-15.39-20.61-19.77-23.23-9.52-5.68-18.91,3.6-13.74,13.74,7.41,14.53,38.9,44.41,54.49,49.51,27.73,9.06,51.94-18.24,66.35-38.72,7.31-10.39,11.89-14.64,6.06-27.69-7.46-16.71-23.41-27.93-42.11-25.37Z"/>
                      <path fill="currentColor" d="M121.73,68.23c7.24-1.3,12.75,1.93,16.7,7.83,7.27,10.87-4.89,18.78-11.07,26.86-1.06.18-12.6-11.18-13.88-12.91-5.91-7.95-1.59-20.02,8.25-21.79Z"/>
                    </svg>
                    <a href="https://vgen.co/nekodanharuno" target="_blank" rel="noopener noreferrer" className="hover:text-primary">vgen.co/nekodanharuno</a>
                  </div>
            </div>
          </div>
          
          <div ref={infoRef} className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">Available For</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Music Video Production</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Promotional Video Production</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
