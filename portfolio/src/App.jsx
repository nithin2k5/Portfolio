import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { FaReact, FaNode, FaPython, FaGithub, FaEnvelope, FaArrowRight, FaHome, FaUser, FaCode, FaFolder, FaJava, FaDocker, FaMoon, FaSun } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiNextdotjs, SiMysql, SiRedis } from 'react-icons/si';
import ScrollToTop from './components/ScrollToTop';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
      <div className="navbar-container">
        <div className="logo">NK</div>
        <div className="nav-links desktop-nav">
          <button className="nav-button" onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>
            <FaHome className="nav-icon" />
          </button>
          <button className="nav-button" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
            <FaUser className="nav-icon" />
          </button>
          <button className="nav-button" onClick={() => document.getElementById('stack').scrollIntoView({ behavior: 'smooth' })}>
            <FaCode className="nav-icon" />
          </button>
          <button className="nav-button" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            <FaFolder className="nav-icon" />
          </button>
          <button className="nav-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            <FaEnvelope className="nav-icon" />
          </button>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <FaSun className="nav-icon" /> : <FaMoon className="nav-icon" />}
        </button>
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <a href="#home" onClick={toggleMenu}>Home</a>
            <a href="#about" onClick={toggleMenu}>About</a>
            <a href="#stack" onClick={toggleMenu}>Stack</a>
            <a href="#projects" onClick={toggleMenu}>Projects</a>
            <a href="#contact" onClick={toggleMenu}>Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const { isDarkMode } = useTheme();

  const projects = [
    {
      title: "Pazaar",
      description: "A full-featured e-commerce platform with secure payment processing, user accounts, and product management capabilities.",
      techStack: ["React", "Spring Boot", "MySQL"],
      liveLink: "https://pazaar.vercel.app",
      githubLink: "https://github.com/nithin2k5/pazaar"
    },
    {
      title: "Arbeit",
      description: "Smart job portal with built-in resume builder, connecting job seekers with employers for seamless hiring experiences.",
      techStack: ["Next.js", "Node.js", "MongoDB"],
      liveLink: "https://arbeit-vrs.vercel.app",
      githubLink: "https://github.com/nithin2k5/arbeit"
    },
    {
      title: "SpeedxType",
      description: "Improve your typing speed and accuracy with interactive tests and real-time performance tracking.",
      techStack: ["Next.js", "CSS", "JavaScript"],
      liveLink: "https://speedxtype.vercel.app",
      githubLink: "https://github.com/nithin2k5/speedxtype"
    }
  ];

  return (
    <div className="app">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-background">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-status">
                <div className="status-dot"></div>
                <span>Available for opportunities</span>
              </div>

              <div className="avatar-container">
                <div className="avatar">
                  <span className="avatar-text">NK</span>
                  <div className="avatar-glow"></div>
                </div>
                <div className="avatar-decoration">
                  <div className="decoration-line line-1"></div>
                  <div className="decoration-line line-2"></div>
                </div>
              </div>

              <div className="hero-text">
                <div className="greeting">
                  <span className="wave">👋</span>
                  <span className="greeting-text">Hello, I'm</span>
                </div>
                <h1 className="hero-title">
                  <span className="hero-name">Nithin Kumar K</span>
                </h1>
                <div className="typing-container">
                  <span className="typed-text"></span>
                  <span className="cursor">|</span>
                </div>
                <p className="hero-description">
                  Third year Computer Science student passionate about crafting digital experiences through code.
                  Full Stack Developer based in India, specializing in modern web technologies and scalable applications.
                </p>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Projects Built</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Technologies</div>
                </div>
              </div>

              <div className="hero-cta">
                <a href="#projects" className="primary-btn">
                  <span>View My Work</span>
                  <FaArrowRight className="btn-icon" />
                </a>
                <a href="#contact" className="secondary-btn">
                  <FaEnvelope className="btn-icon" />
                  <span>Let's Connect</span>
                </a>
              </div>

              <div className="hero-social">
                <a href="https://github.com/nithin2k5" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaGithub />
                </a>
                <a href="mailto:ntbm8125@gmail.com" className="social-link">
                  <FaEnvelope />
                </a>
              </div>

              <div className="scroll-indicator">
                <div className="scroll-mouse">
                  <div className="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="container">
            <div className="section-header">
              <h2>About</h2>
            </div>
            <div className="about-content">
              <p className="about-description">
                Hello, World! I am Nithin Kumar K, a Full-Stack Developer passionate about crafting high-performance, scalable web applications. With a strong foundation in Next.js, React, Node.js, and modern web technologies, I thrive on building seamless user experiences and optimizing system performance.
              </p>
              <p className="about-description">
                With experience in both frontend and backend development, I have worked on multiple projects. I also enjoy learning and exploring new technologies to stay updated with the latest industry trends.
              </p>
              <p className="about-description">
                One of my notable projects includes an e-commerce platform and various web applications. I am currently seeking internship and full-time software roles where I can contribute my skills and grow as a developer.
              </p>
              <div className="about-cta">
                <a href="#contact" className="cta-btn">
                  Let's connect and collaborate!
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="tech-stack" id="stack">
          <div className="container">
            <div className="section-header">
              <h2>Stack</h2>
            </div>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-icon">
                  <SiTypescript />
                </div>
                <span className="tech-name">TypeScript</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <SiJavascript />
                </div>
                <span className="tech-name">JavaScript</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <FaPython />
                </div>
                <span className="tech-name">Python</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <FaJava />
                </div>
                <span className="tech-name">Java</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <FaNode />
                </div>
                <span className="tech-name">Node.js</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <FaReact />
                </div>
                <span className="tech-name">React</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <SiNextdotjs />
                </div>
                <span className="tech-name">Next.js</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <FaGithub />
                </div>
                <span className="tech-name">Git</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <FaDocker />
                </div>
                <span className="tech-name">Docker</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <SiMongodb />
                </div>
                <span className="tech-name">MongoDB</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <SiMysql />
                </div>
                <span className="tech-name">MySQL</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <SiRedis />
                </div>
                <span className="tech-name">Redis</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="education" id="education">
          <div className="container">
            <div className="section-header">
              <h2>Education</h2>
            </div>
            <div className="education-content">
              <div className="education-item">
                <div className="education-info">
                  <h3 className="university-name">VR Siddhartha Engineering College</h3>
                  <h4 className="degree">Bachelor of Technology in Computer Science & Engineering</h4>
                  <p className="education-period">2021 - 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects" id="projects">
          <div className="container">
            <div className="section-header">
              <h2>Projects</h2>
            </div>
            <div className="projects-list">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-item"
                >
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-links">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live
                      </a>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        Source
                      </a>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.techStack && project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Contact Section */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact</h2>
          </div>
          <div className="contact-content">
            <a href="mailto:ntbm8125@gmail.com" className="contact-link">
              Send Email
            </a>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Nithin Kumar K. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}

export default App;
export { ThemeProvider };