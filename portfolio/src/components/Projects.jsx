import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "PAZAAR",
      description: "A full-featured e-commerce platform with secure payment processing, user accounts, and product management capabilities.",
      techStack: ["React", "Spring Boot", "MySQL"],
      liveLink: "https://pazaar.vercel.app",
      githubLink: "https://github.com/nithin2k5/pazaar",
      year: "2024"
    },
    {
      title: "ARBEIT",
      description: "Smart job portal with built-in resume builder, connecting job seekers with employers for seamless hiring experiences.",
      techStack: ["Next.js", "Node.js", "MongoDB"],
      liveLink: "https://arbeit-vrs.vercel.app",
      githubLink: "https://github.com/nithin2k5/arbeit",
      year: "2024"
    },
    {
      title: "SPEEDXTYPE",
      description: "Improve your typing speed and accuracy with interactive tests and real-time performance tracking.",
      techStack: ["Next.js", "CSS", "JavaScript"],
      liveLink: "https://speedxtype.vercel.app",
      githubLink: "https://github.com/nithin2k5/speedxtype",
      year: "2023"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-32 px-4 bg-background relative transition-colors duration-500">
      {/* Vertical Section Name */}
      <div className="absolute top-32 left-10 hidden lg:block h-full">
        <div className="flex flex-col gap-2 sticky top-32">
          <div className="w-10 h-[1px] bg-foreground/20"></div>
          <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold rotate-90 origin-left mt-8 whitespace-nowrap">PROJECTS</p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto lg:ml-20">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-xs font-black text-primary/40 tracking-[0.3em] uppercase">The Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-foreground tracking-tighter"
            >
              SELECTED WORKS.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-xs text-sm font-medium"
          >
            A collection of projects where I've pushed the boundaries of web development and user experience.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-primary/10 border border-primary/10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-background p-8 flex flex-col h-full transition-all duration-500 hover:z-10"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] font-black tracking-widest text-primary/40 uppercase">
                  Project {index + 1} // {project.year}
                </span>
                <div className="flex gap-4">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors">
                    <FaArrowUpRightFromSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-black text-foreground mb-4 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-[10px] font-black tracking-tighter border border-primary/10 bg-primary/[0.02] px-2 py-0.5 text-primary/60"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>

                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-black tracking-widest uppercase hover:no-underline group-hover:text-primary transition-colors"
                  asChild
                >
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    View Project <span className="ml-2 group-hover:translate-x-2 inline-block transition-transform">→</span>
                  </a>
                </Button>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
