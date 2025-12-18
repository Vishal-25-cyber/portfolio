import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Experience', href: 'experience' },
    { name: 'Contact', href: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            Portfolio
          </a>
        </div>
        
        <button 
          className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
