import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaMobileAlt, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', isError: false });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ text: '', isError: false });
    
    // EmailJS service configuration
    // IMPORTANT: To make this work, you need to:
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create an Email Service (e.g., Gmail, Outlook)
    // 3. Create an Email Template with the following variables:
    //    - from_name (sender's name)
    //    - from_email (sender's email)
    //    - subject (email subject)
    //    - message (email body)
    //    - to_email (recipient's email - you can hardcode this in the template)
    // 4. Get your User ID from Account > API Keys
    // 5. Replace the values below with your actual credentials
    
    const serviceId = 'YOUR_SERVICE_ID'; // Get this from EmailJS dashboard
    const templateId = 'YOUR_TEMPLATE_ID'; // Get this from EmailJS dashboard
    const userId = 'YOUR_USER_ID'; // Your EmailJS public key
    
    const templateParams = {
      to_name: 'Nithin Kumar',
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'koppisettinithin67@gmail.com' // This can be hardcoded in the template instead
    };
    
    try {
      // For testing purposes only - remove this in production and uncomment the line below
      console.log('Sending email with params:', templateParams);
      // await emailjs.send(serviceId, templateId, templateParams, userId);
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitMessage({ 
        text: 'Your message has been sent successfully!', 
        isError: false 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage({ 
        text: 'There was an error sending your message. Please try again.', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="section-header">
          <h2>Contact Me</h2>
          <p className="contact-subtitle">Have a project in mind or want to chat? Send me a message!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-details">
                <h3>Email</h3>
                <p><a href="mailto:koppisettinithin67@gmail.com">koppisettinithin67@gmail.com</a></p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <FaMobileAlt />
              </div>
              <div className="info-details">
                <h3>Phone</h3>
                <p><a href="tel:+919398225082">+91 9398225082</a></p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Andhra Pradesh, India</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Hello, I'd like to discuss a project..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="primary-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage.text && (
                <div className={`submit-message ${submitMessage.isError ? 'error' : 'success'}`}>
                  {submitMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 