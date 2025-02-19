import React from 'react';
import './App.css';
import { FaReact, FaNode, FaPython, FaDatabase, FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb } from 'react-icons/si';

const ProjectCard = ({ title, description, image, techStack, liveLink, githubLink }) => (
  <div className="project-card">
    <div className="project-image">
      <img src={image} alt={title} />
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
      <div className="project-links">
        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
       
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
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
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
              description="A modern analytics dashboard with real-time data visualization, custom charts, and responsive design for optimal viewing across devices."
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              techStack={["Reactjs", "SpringBoot", "MySql"]}
              liveLink="https://project-demo.com"
              githubLink="https://github.com/username/project"
            />
            <ProjectCard 
              title="Neural Canvas"
              description="Pazaar Jobs is a smart job portal with a built-in resume builder, connecting job seekers with employers for seamless hiring. "
              image="https://i.imghippo.com/files/FHki3312Ywo.png"
              techStack={["Nextjs", "Node.js", "MongoDB"]}
              liveLink="https://pazaar.vercel.app"
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
