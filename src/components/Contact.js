import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const contactDetails = [
    { icon: <FaEnvelope />, title: 'Email', value: 'vishal250820@gmail.com' },
    { icon: <FaPhone />, title: 'Phone', value: '+91 6381180488' },
    { icon: <FaMapMarkerAlt />, title: 'Location', value: 'Cuddalore, Tamil Nadu' }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Vishal-25-cyber' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/feed/' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/u/K_VISHAL_25/' },
    { icon: <FaInstagram />, url: 'https://instagram.com/vishxl_76' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later or email me directly at vishal250820@gmail.com'
      });
    }

    setTimeout(() => {
      setFormStatus({ type: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-subtitle">Let's work together</div>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's talk about everything!</h3>
            <p>
              Have a project in mind or just want to say hi? Feel free to reach out. 
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            
            <div className="contact-details">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="contact-icon">{detail.icon}</div>
                  <div>
                    <h4>{detail.title}</h4>
                    <p>{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-links-contact">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Your Message"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <FaPaperPlane /> Send Message
            </button>
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
