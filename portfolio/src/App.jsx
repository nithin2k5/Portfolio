import React, { useCallback, useState, useEffect } from 'react';
import './App.css';
import './animations.css';
import { FaReact, FaNode, FaPython, FaDatabase, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaMobileAlt, FaInstagram } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb } from 'react-icons/si';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from './components/ScrollToTop';

const ProjectCard = ({ title, description, image, techStack, liveLink, index }) => (
  <div 
    className="project-card glass-effect" 
    data-aos="fade-up" 
    data-aos-delay={index * 100}
    data-aos-duration="800"
  >
    <div className="project-image">
      <img src={image} alt={title} loading="lazy" />
      <div className="project-overlay">
        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link shine-effect">
          View Project
        </a>
      </div>
    </div>
    <div className="project-content">
      <span className="project-label">Featured Project</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-tech">
        {techStack && techStack.map((tech, techIndex) => (
          <span key={techIndex} className="tech-tag hover-effect">{tech}</span>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ title, company, period, description, skills, type, year, isFirst, index }) => (
  <div 
    className={`experience-card ${type.toLowerCase()}`}
    data-aos="fade-right"
    data-aos-delay={index * 150}
    data-aos-duration="1000"
  >
    {isFirst && <div className="timeline-year">{year}</div>}
    <div className="experience-card-content glass-effect">
      <div className="experience-header">
        <span className="experience-type">{type}</span>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <span className="experience-period">{period}</span>
      </div>
      <div className="experience-body">
        <p className="description">{description}</p>
        {skills && (
          <div className="experience-skills">
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-tag hover-effect">
                {skill.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const SkillCard = ({ logo, name, level, index }) => (
  <div 
    className="skill-card glass-effect" 
    data-aos="zoom-in" 
    data-aos-delay={index * 100}
    data-aos-duration="600"
  >
    <div className="logo-container">
      <img src={logo} alt={name} className="skill-logo" loading="lazy" />
    </div>
    <div className="skill-name-container">
      <h3>{name}</h3>
      {level && (
        <div className="skill-level">
          <div className="skill-level-fill" style={{ width: `${level}%` }}></div>
        </div>
      )}
    </div>
  </div>
);

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 120,
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          color: {
            value: ["#8B5CF6", "#A78BFA", "#C4B5FD"],
          },
          links: {
            color: "#8B5CF6",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 1,
              sync: false,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.8,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

const MobileMenu = ({ isOpen, toggleMenu }) => (
  <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
    <div className="mobile-menu-content">
      <a href="#home" onClick={toggleMenu} className="hover-effect">Home</a>
      <a href="#about" onClick={toggleMenu} className="hover-effect">About</a>
      <a href="#experience" onClick={toggleMenu} className="hover-effect">Experience</a>
      <a href="#skills" onClick={toggleMenu} className="hover-effect">Skills</a>
      <a href="#projects" onClick={toggleMenu} className="hover-effect">Projects</a>
      <a href="#contact" onClick={toggleMenu} className="hover-effect">Contact</a>
    </div>
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo gradient-text">NK</div>
        <div className="nav-links desktop-nav">
          <a href="#home" className="hover-effect">Home</a>
          <a href="#about" className="hover-effect">About</a>
          <a href="#experience" className="hover-effect">Experience</a>
          <a href="#skills" className="hover-effect">Skills</a>
          <a href="#projects" className="hover-effect">Projects</a>
          <a href="#contact" className="hover-effect">Contact</a>
        </div>
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
};

const ExperienceSection = ({ experiences, achievements }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Group experiences by year
  const experiencesByYear = {};
  
  // Filter items based on active tab
  const filteredItems = activeTab === 'all' 
    ? [...experiences, ...achievements]
    : activeTab === 'experience' 
      ? experiences 
      : achievements;
      
  // Sort by most recent first
  filteredItems.sort((a, b) => {
    const yearA = parseInt(a.period.split(' - ')[1] || a.period.split(' - ')[0]);
    const yearB = parseInt(b.period.split(' - ')[1] || b.period.split(' - ')[0]);
    return yearB - yearA;
  });

  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="800">
          <h2>Professional Journey</h2>
        </div>
        
        <div className="experience-tabs" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
          <button 
            className={`experience-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`experience-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={`experience-tab ${activeTab === 'achievement' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievement')}
          >
            Achievements
          </button>
        </div>
        
        <div className="experience-content">
          <div className="experience-timeline">
            {filteredItems.map((item, index) => {
              const isExperience = experiences.includes(item);
              const type = isExperience ? 'experience' : 'achievement';
              const period = item.period;
              const year = period.split(' - ')[1] || period.split(' - ')[0];
              
              return (
                <ExperienceCard 
                  key={`${type}-${index}`} 
                  {...item} 
                  type={isExperience ? 'Experience' : 'Achievement'}
                  year={year}
                  isFirst={index === 0 || (filteredItems[index-1] && 
                    (filteredItems[index-1].period.split(' - ')[1] || filteredItems[index-1].period.split(' - ')[0]) !== year)}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 0
    });
  }, []);

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
          name: "C",
          level: 85
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          name: "Java",
          level: 80
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          name: "Python",
          level: 90
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
          name: "C#",
          level: 75
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          name: "JavaScript",
          level: 95
        }
      ]
    },
    {
      category: "Frontend Technologies",
      skills: [
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          name: "React",
          level: 90
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
          name: "Next.js",
          level: 85
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          name: "React Native",
          level: 85
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
          name: ".NET Framework",
          level: 75
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          name: "HTML5",
          level: 95
        },
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
          name: "CSS3",
          level: 90
        }
      ]
    },
    {
      category: "Databases",
      skills: [
        { 
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
          name: "MySQL",
          level: 85
        },
        {
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
          name: "MongoDB",
          level: 80
        },
        {
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          name: "PostgreSQL",
          level: 75
        }
      ]
    }
  ];

  const experiences = [
    {
      title: "Computer Vision Engineer",
      company: "Infac India ltd.",
      period: "14/5/2025 - 4/6/2025",
      description: "Led development of multiple full-stack applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      skills: [
        {
          name: "OpenCV",
          description: "A real-time safety monitoring system using OpenCV and MediaPipe for detecting unsafe human actions and ensuring workplace safety."
        }
      ]
    },
  ];

  const achievements = [
    {
      title: "Hackathon Runner Up",
      company: "VR Siddhartha Engineering College",
      period: "2024",
      description: "Won second place in national level webathon with an innovative project that solved real-world problems using cutting-edge technologies.",
      skills: [
        {
          name: "Full Stack Web Development",
          description: "Developed unique AI-powered solution for healthcare"
        },
        {
          name: "Problem Solving",
          description: "Created innovative solutions under tight deadlines"
        }
      ]
    },
  ];

  const projects = [
    {
      title: "E-commerce Website",
      description: "A full-featured e-commerce platform with secure payment processing, user accounts, and product management capabilities.",
      image: "https://i.imghippo.com/files/tbt2932c.png",
      techStack: ["React", "Spring Boot", "MySQL"],
      liveLink: "https://pazaar.vercel.app"
    },
    {
      title: "Pazaar",
      description: "Smart job portal with built-in resume builder, connecting job seekers with employers for seamless hiring experiences.",
      image: "https://i.imghippo.com/files/FHki3312Ywo.png",
      techStack: ["Next.js", "Node.js", "MongoDB"],
      liveLink: "https://arbeit-vrs.vercel.app"
    },
    {
      title: "SpeedxType",
      description: "Improve your typing speed and accuracy with interactive tests and real-time performance tracking.",
      image: "https://i.imghippo.com/files/wYe9465CIY.png",
      techStack: ["Next.js", "CSS", "JavaScript"],
      liveLink: "https://speedxtype.vercel.app"
    }
  ];

  // If you prefer the simple flat list, you can flatten all skills:
  const skills = skillCategories.reduce((allSkills, category) => {
    return [...allSkills, ...category.skills];
  }, []);

  return (
    <div className="app">
      <ParticlesBackground />
      <Navbar />

      <main>
        <section className="hero gradient-bg" id="home">
          <div className="container">
            <div className="hero-content">
              <div className="avatar-container" data-aos="zoom-in" data-aos-duration="1000">
                <div className="avatar float">NK</div>
              </div>
              <h1 data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Hello, I'm <span className="highlight glow">Nithin Kumar K</span>
              </h1>
              <h2 className="profession" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                Full Stack Developer
              </h2>
              <p className="subtitle" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                Passionate about creating elegant, efficient, and user-friendly web applications that solve real-world problems.
              </p>
              <div className="hero-cta" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
                <a href="#projects" className="primary-btn shine-effect">View Projects</a>
                <a href="#contact" className="secondary-btn hover-effect">Contact Me</a>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="section-header" data-aos="fade-up" data-aos-duration="800">
              <h2>About Me</h2>
            </div>
            <div className="about-content">
              <div className="about-text" data-aos="fade-right" data-aos-duration="800">
                <p>
                  I am a passionate Full Stack Developer with expertise in building scalable web applications 
                  and solving complex problems. With a strong foundation in both frontend and backend technologies, 
                  I strive to create efficient and user-friendly solutions that make a difference.
                </p>
                <p>
                  My approach combines technical excellence with creative problem-solving, enabling me to develop
                  applications that are not only functional but also intuitive and enjoyable to use. I'm constantly
                  learning and exploring new technologies to enhance my skill set.
                </p>
              </div>
              <div className="about-stats" data-aos="fade-left" data-aos-delay="200" data-aos-duration="800">
                <div className="stat-card glass-effect" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="600">
                  <h3>5+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-card glass-effect" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="600">
                  <h3>3</h3>
                  <p>Current Projects</p>
                </div>
                <div className="stat-card glass-effect" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="600">
                  <h3>2+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="container">
            <div className="section-header" data-aos="fade-up" data-aos-duration="800">
              <h2>Technical Skills</h2>
            </div>
            
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="skill-category" data-aos="fade-up" data-aos-delay={catIndex * 200} data-aos-duration="800">
                <h3 className="category-title">{category.category}</h3>
                <div className="skills-grid">
                  {category.skills.map((skill, index) => (
                    <SkillCard key={index} {...skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <ExperienceSection experiences={experiences} achievements={achievements} />

        <section className="projects" id="projects">
          <div className="container">
            <div className="section-header" data-aos="fade-up" data-aos-duration="800">
              <h2>Featured Projects</h2>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index}
                  {...project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main" data-aos="fade-up" data-aos-duration="800">
              <h2>Let's Work <span className="highlight">Together</span></h2>
              <p>I'm currently available for freelance work or full-time opportunities. If you're interested in collaborating on a project or discussing potential opportunities, feel free to reach out.</p>
              <div className="footer-cta">
                <a href="mailto:ntbm8125@gmail.com" className="primary-btn shine-effect">Start a Project</a>
                <a href="#" className="secondary-btn hover-effect">Download Resume</a>
              </div>
            </div>
            
            <div className="footer-grid">
              <div className="footer-section" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                <h3>Contact Information</h3>
                <ul className="contact-list">
                  <li>
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:ntbm8125@gmail.com" className="hover-effect">ntbm8125@gmail.com</a>
                  </li>
                  <li>
                    <FaMobileAlt className="contact-icon" />
                    <a href="tel:+919398225082" className="hover-effect">+91 9398225082</a>
                  </li>
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Andhra Pradesh, India</span>
                  </li>
                </ul>
              </div>
              
              <div className="footer-section" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
                <h3>Connect With Me</h3>
                <div className="social-links">
                  <a href="https://github.com/nithin2k5/" target="_blank" rel="noopener noreferrer" className="social-icon hover-effect" aria-label="Github">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/nithin-kumar-k-b17b90297/" target="_blank" rel="noopener noreferrer" className="social-icon hover-effect" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="https://www.instagram.com/void.nxt/" target="_blank" rel="noopener noreferrer" className="social-icon hover-effect" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                </div>
                <p className="social-text">Follow me on social media to stay updated with my latest projects and professional journey.</p>
              </div>
              
              <div className="footer-section" data-aos="fade-up" data-aos-delay="600" data-aos-duration="800">
                <h3>Quick Links</h3>
                <nav className="footer-nav">
                  <a href="#home" className="hover-effect">Home</a>
                  <a href="#about" className="hover-effect">About</a>
                  <a href="#skills" className="hover-effect">Skills</a>
                  <a href="#experience" className="hover-effect">Experience</a>
                  <a href="#projects" className="hover-effect">Projects</a>
                </nav>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Nithin Kumar K. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#privacy" className="hover-effect">Privacy Policy</a>
                <a href="#terms" className="hover-effect">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}

export default App;
