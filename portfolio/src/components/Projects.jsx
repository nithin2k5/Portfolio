import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Projects = () => {
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
    <section id="projects" className="py-24 px-4 bg-black relative">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-medium text-white/40 tracking-widest uppercase">My Work</span>
            <div className="h-px w-12 bg-white mx-auto mt-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-2 border-white/10 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:border-white/30 hover:bg-white/10 transition-all duration-500 flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-5 flex-1 text-sm">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 py-1 text-xs font-medium border border-white/20 bg-white/5 text-white/80 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 rounded-none border-2 border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-xs py-2"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      Live
                    </Button>
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 rounded-none border-2 border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-xs py-2"
                    >
                      <FaGithub className="w-3 h-3" />
                      Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
