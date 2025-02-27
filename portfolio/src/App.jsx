import React from 'react';
import './App.css';
import './animations.css';
import { FaReact, FaNode, FaPython, FaDatabase, FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb } from 'react-icons/si';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectCard = ({ title, description, image, techStack, liveLink, githubLink }) => (
  <div className="project-card" data-aos="fade-up">
    <div className="project-image">
      <img src={image} alt={title} />
      <div className="project-overlay">
        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project <span>→</span>
        </a>
      </div>
    </div>
    <div className="project-content">
      <span className="project-label">Featured Project</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-tech">
        {techStack && techStack.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ title, company, period, description, skills }) => (
  <div className="work-card">
    <h3>{title}</h3>
    <h4>{company}</h4>
    <p className="period">{period}</p>
    <p className="description">{description}</p>
    {skills && (
      <div className="skills-container">
        <h5>Key Skills</h5>
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-details">
              <h6>{skill.name}</h6>
              <p>{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const skills = [
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      name: "C"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      name: "Java"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      name: "Python"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      name: "C#"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      name: "React"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      name: "Next.js"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      name: "HTML5"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      name: "CSS3"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      name: "JavaScript"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      name: "Node.js"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      name: "MySQL"
    }
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Led development of multiple full-stack applications using modern technologies.",
      skills: [
        {
          name: "Full Stack Development",
          description: "Built scalable web applications using React, Node.js, and MongoDB"
        },
        {
          name: "Team Leadership",
          description: "Mentored junior developers and managed project timelines"
        }
      ]
    },
  ];

  const achievements = [
    {
      title: "Hackathon Winner",
      company: "Tech Fest 2023",
      period: "2023",
      description: "Won first place in national level hackathon for innovative solution in AI.",
      skills: [
        {
          name: "Innovation",
          description: "Developed unique AI-powered solution for healthcare"
        }
      ]
    },
  ];

  return (
    <div className="app">
      <nav className="navbar glass-effect">
        <div className="logo">⚡</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section className="hero gradient-bg">
          <div className="hero-content" data-aos="fade-up">
            <div className="avatar-container">
              <div className="avatar pulse">👨‍💻</div>
            </div>
            <h1>Hello! I Am <span className="highlight gradient-text">Nithin Kumar K</span></h1>
            <h2>Full Stack <span className="highlight gradient-text">Developer</span></h2>
            <p className="subtitle">Code Enthusiast, Delivering Full-Scale Solutions</p>
            <div className="hero-cta">
              <button className="primary-btn shine-effect">View Projects</button>
              <button className="secondary-btn pulse-effect">Contact Me</button>
            </div>
          </div>
          <div className="hero-shape"></div>
        </section>

        <section className="about" id="about">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I am a passionate Full Stack Developer with expertise in building scalable web applications 
                and solving complex problems. With a strong foundation in both frontend and backend technologies, 
                I strive to create efficient and user-friendly solutions that make a difference.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <h3>5+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-card">
                <h3>3</h3>
                <p>Ongoing Projects</p>
              </div>
              <div className="stat-card">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <h2 data-aos="fade-up">Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card glass-effect"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="experience" id="experience">
          <h2>Experience & Achievements</h2>
          <div className="work-grid">
            {experiences.map((exp, index) => (
              <ExperienceCard key={`exp-${index}`} {...exp} />
            ))}
            {achievements.map((achievement, index) => (
              <ExperienceCard key={`achievement-${index}`} {...achievement} />
            ))}
          </div>
        </section>

        <section className="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            <ProjectCard 
              title="E-commerce Website"
              description="An eCommerce website is an online platform that allows businesses and individuals to buy and sell products or services. It features product browsing, secure payment processing, order tracking, and customer accounts, offering a convenient shopping experience available 24/7."
              image="https://i.imghippo.com/files/tbt2932c.png"
              techStack={["Reactjs", "SpringBoot", "MySql"]}
              liveLink="https://pazaar.vercel.app"
              githubLink="https://github.com/username/project"
            />
            <ProjectCard 
              title="Pazaar"
              description="Arbeit is a smart job portal with a built-in resume builder, connecting job seekers with employers for seamless hiring. "
              image="https://i.imghippo.com/files/FHki3312Ywo.png"
              techStack={["Nextjs", "Node.js", "MongoDB"]}
              liveLink="https://arbeit-vrs.vercel.app"
              githubLink="https://github.com/username/project"
            />
            <ProjectCard 
              title="SpeedxType"
              description="Improve your typing speed and accuracy with fun, interactive tests and real-time tracking. Practice, compete, and boost your skills effortlessly!"
              image="https://i.imghippo.com/files/wYe9465CIY.png"
              techStack={["Nextjs"]}
              liveLink="https://speedxtype.vercel.app"
              githubLink="https://github.com/username/project"
            />
            
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
          <div className="footer-content">
            <div className="footer-main">
              <h2>Let's Build Something <span className="highlight">Together</span></h2>
              <p>I'm currently looking to join a cross-functional team that values improving people's lives through accessible design.</p>
              <div className="footer-cta">
                <button className="primary-btn">Start a Project</button>
                <button className="secondary-btn">Download Resume</button>
              </div>
            </div>
            
            <div className="footer-grid">
              <div className="footer-section">
                <h3>Contact</h3>
                <p><span role="img" aria-label="email">📧</span> ntbm8125@gmail.com</p>
                <p><span role="img" aria-label="phone">📱</span> +91 9398225082</p>
                <p><span role="img" aria-label="location">📍</span> Andhra Pradesh, India</p>
              </div>
              
              <div className="footer-section">
                <h3>Follow Me</h3>
                <div className="social-links">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Github">
                    <FaGithub size={24} />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <FaLinkedin size={24} />
                  </a>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                    <FaTwitter size={24} />
                  </a>
                  <a href="https://dribbble.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Dribbble">
                    <FaDribbble size={24} />
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3>Quick Links</h3>
                <nav className="footer-nav">
                  <a href="#skills">Skills</a>
                  <a href="#about">About</a>
                  <a href="#projects">Projects</a>
                  <a href="#contact">Contact</a>
                </nav>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Nithin. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default App;
