import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Check if URL has /admin
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (showAdmin) {
    return (
      <div className="App">
        <AdminPanel />
        <button 
          className="btn btn-secondary"
          style={{position: 'fixed', top: '20px', left: '20px', zIndex: 1000}}
          onClick={() => {setShowAdmin(false); window.history.pushState({}, '', '/');}}
        >
          ← Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
