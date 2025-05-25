import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const bio = bioRef.current;
    const skills = skillsRef.current;
    
    if (!section || !title || !bio || !skills) return;
    
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
    
    // Animate bio
    gsap.fromTo(bio,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: bio,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate skills
    const skillItems = skills.querySelectorAll('.skill-item');
    skillItems.forEach((skill, index) => {
      gsap.fromTo(skill,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: skills,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { id: 1, name: 'Video Direction', percentage: 100 },
    { id: 2, name: 'Motion Graphics', percentage: 90 },
    { id: 3, name: 'After Effects', percentage: 90 },
    { id: 4, name: 'Blender', percentage: 80 },
    { id: 5, name: 'Laravel Development (Beginner)', percentage: 35 },
    { id: 6, name: 'ReactJS Development (Beginner)', percentage: 15 },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-secondary/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          
            <p ref={bioRef} className="text-lg mb-16">
            My name is Wildan, also known as <span className="text-primary font-semibold">Nekodan Haruno</span>. I am a <span className="text-primary font-semibold">Video Editor</span> and <span className="text-primary font-semibold">Junior Web Developer</span>.
            <br /><br />
            With over 3 years of experience in creative work including PV/MV creations, Motion Graphics, and Video Editing. I specialize in bringing visual stories to life through compelling video content while expanding my skills in web development.
            </p>
          
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skills.map(skill => (
              <div key={skill.id} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
