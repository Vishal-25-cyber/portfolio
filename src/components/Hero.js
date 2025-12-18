import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaChevronDown } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Vishal-25-cyber', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/vishxl_76/', label: 'Instagram' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/u/K_VISHAL_25/', label: 'LeetCode' }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-content container">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Vishal K</span>
          </h1>
          <h2 className="hero-subtitle">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'UI/UX Designer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </h2>
          <p className="hero-description">
            Third-year Computer Science student at Kongu Engineering College, passionate about Full Stack Development and UI Design.
            Let's build something amazing together!
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              View Projects
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </button>
          </div>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="profile-img-container">
            <div className="profile-img-bg"></div>
            <img 
              src="/images/profile.jpg" 
              alt="Vishal K - Full Stack Developer" 
              className="profile-img"
            />
          </div>
        </motion.div>
      </div>

      <div className="scroll-down">
        <a 
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}
        >
          <FaChevronDown />
        </a>
      </div>
    </section>
  );
};

export default Hero;
