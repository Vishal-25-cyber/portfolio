import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description: 'Modern and responsive portfolio website built with React, featuring smooth animations, dark theme, integrated contact form with Node.js backend, and email functionality.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['React', 'Node.js', 'Express'],
      category: 'fullstack',
      demoUrl: 'http://localhost:3000',
      githubUrl: 'https://github.com/Vishal-25-cyber'
    },
    {
      id: 2,
      title: 'Advanced Full Stack Application',
      description: 'A comprehensive full-stack web application built with modern JavaScript technologies, featuring robust backend API and interactive frontend.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
      tags: ['JavaScript', 'Full Stack', 'Web Dev'],
      category: 'fullstack',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/Advanced_fullstack'
    },
    {
      id: 3,
      title: 'Bank Fraud Detection System',
      description: 'Machine learning-based fraud detection system using Python to identify fraudulent banking transactions with high accuracy.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      tags: ['Python', 'Machine Learning', 'Security'],
      category: 'ml',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/Bank_fraud_detection'
    },
    {
      id: 4,
      title: 'AI Chatbot Interface',
      description: 'Modern chatbot UI with conversational AI capabilities for seamless user interactions.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
      tags: ['JavaScript', 'AI', 'UI/UX'],
      category: 'web',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/chatbot-ui'
    },
    {
      id: 5,
      title: 'Event Management System',
      description: 'Complete event management platform for organizing and managing events with user-friendly interface and comprehensive features.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'web',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/Event_Management_System'
    },
    {
      id: 6,
      title: 'House Price Prediction API',
      description: 'RESTful API for house price prediction using machine learning algorithms, built with Python and Flask.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      tags: ['Python', 'API', 'ML'],
      category: 'ml',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/house-price-api'
    },
    {
      id: 7,
      title: 'JWT Authentication System',
      description: 'Secure authentication system implementing JWT tokens for user authorization and session management.',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop',
      tags: ['Authentication', 'Security', 'CSS'],
      category: 'fullstack',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/JWT'
    },
    {
      id: 8,
      title: 'Password Manager',
      description: 'Secure password management application with encryption for storing and managing user credentials safely.',
      image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&h=400&fit=crop',
      tags: ['JavaScript', 'Security', 'Encryption'],
      category: 'web',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/Password_Manager'
    },
    {
      id: 9,
      title: 'E-Voting System',
      description: 'Digital voting platform ensuring secure and transparent electoral processes with blockchain-like security features.',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=600&h=400&fit=crop',
      tags: ['Web App', 'Security', 'Democracy'],
      category: 'web',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/E-voting'
    }
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Full Stack', value: 'fullstack' },
    { name: 'Web Apps', value: 'web' },
    { name: 'Machine Learning', value: 'ml' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="section-subtitle">Recent works and achievements</div>

        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
