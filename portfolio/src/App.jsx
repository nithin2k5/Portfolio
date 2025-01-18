import React from 'react';
import './App.css';
import { FaReact, FaNode, FaPython, FaDatabase, FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb } from 'react-icons/si';

const ProjectCard = ({ title, description, image }) => (
  <div className="project-card">
    <div className="project-image">
      <img src={image} alt={title} />
    </div>
    <div className="project-content">
      <span className="project-label">Featured Project</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-tech">
        <span>✨</span>
        <span>✨</span>
      </div>
    </div>
  </div>
);

function App() {
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
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      name: "MongoDB"
    },
    { 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      name: "MySQL"
    }
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">⚡</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">Experience</a>
          <a href="#lab"></a>
          <a href="#footer">Contact</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="avatar-container">
              <div className="avatar">👨‍💻</div>
            </div>
            <h1>Hello! I Am <span className="highlight">Nithin Kumar K</span></h1>
            <h2>Full Stack <span className="highlight"> Developer</span></h2>
            <p className="subtitle">Code Enthusiast, Delivering Full-Scale Solutions</p>
            <div className="hero-cta">
              <button className="primary-btn" href="#projects">View Projects</button>
              <button className="secondary-btn">Contact Me</button>
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            <ProjectCard 
              title="Stellar Dashboard"
              description="A revolutionary space mission control interface with real-time telemetry"
              image="https://via.placeholder.com/500x300"
            />
            <ProjectCard 
              title="Neural Canvas"
              description="AI-powered digital art creation platform with collaborative features"
              image="https://via.placeholder.com/500x300"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
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
                <p>ntbm8125@gmail.com</p>
                <p>+91 9398225082</p>
                <p>Andhra Pradesh, India</p>
              </div>
              
              <div className="footer-section">
                <h3>Follow Me</h3>
                <div className="social-links">
                  <a href="#" className="social-icon" aria-label="Github">
                    <FaGithub />
                  </a>
                  <a href="#" className="social-icon" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="social-icon" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-icon" aria-label="Dribbble">
                    <FaDribbble />
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3>Quick Links</h3>
                <nav className="footer-nav">
                  <a href="#work">Work</a>
                  <a href="#about">About</a>
                  <a href="#projects">Projects</a>
                  <a href="#blog">Blog</a>
                </nav>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>© 2024 Nithin. All rights reserved.</p>
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
