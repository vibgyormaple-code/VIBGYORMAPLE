import React, { useState } from 'react';

const SimpleContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  console.log('SimpleContact component rendering'); // Debug log

  return (
    <div style={{
      padding: 'clamp(40px, 8vw, 80px) clamp(1rem, 4vw, 2rem)',
      background: '#ffffff',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: '700',
        color: '#1a202c',
        textAlign: 'center',
        marginBottom: 'clamp(1rem, 3vw, 2rem)',
        lineHeight: '1.2'
      }}>
        Contact Us
      </h1>
      
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
        color: '#4a5568',
        textAlign: 'center',
        marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
        maxWidth: '600px',
        margin: '0 auto clamp(1.5rem, 4vw, 3rem) auto',
        lineHeight: '1.6'
      }}>
        We'd love to hear from you. Whether you have a question about our products, 
        pricing, or anything else, our team is ready to answer all your questions.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(1.5rem, 4vw, 3rem)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Contact Information */}
        <div style={{
          background: '#f8fafc',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'clamp(12px, 3vw, 16px)'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            lineHeight: '1.3'
          }}>
            Contact Information
          </h3>
          
          <div style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
            <h4 style={{ 
              marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)', 
              color: '#1a202c',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              fontWeight: '600'
            }}>Our Location</h4>
            <p style={{ 
              color: '#4a5568', 
              margin: '0',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              lineHeight: '1.5'
            }}>
              Grass Hawk Technologies<br />
              1234 Innovation Drive<br />
              Agricultural Park, CA 90210
            </p>
          </div>

          <div style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
            <h4 style={{ 
              marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)', 
              color: '#1a202c',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              fontWeight: '600'
            }}>Phone Numbers</h4>
            <p style={{ 
              color: '#4a5568', 
              margin: '0',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              lineHeight: '1.5'
            }}>
              Sales: <a href="tel:+1-800-GRASS-01" style={{ 
                color: '#2563eb',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                wordBreak: 'break-all'
              }}>+1 (800) GRASS-01</a><br />
              Support: <a href="tel:+1-800-GRASS-02" style={{ 
                color: '#2563eb',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                wordBreak: 'break-all'
              }}>+1 (800) GRASS-02</a>
            </p>
          </div>

          <div>
            <h4 style={{ 
              marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)', 
              color: '#1a202c',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              fontWeight: '600'
            }}>Email Addresses</h4>
            <p style={{ 
              color: '#4a5568', 
              margin: '0',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              lineHeight: '1.5'
            }}>
              General: <a href="mailto:info@grasshawk.com" style={{ 
                color: '#2563eb',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                wordBreak: 'break-all'
              }}>info@grasshawk.com</a><br />
              Sales: <a href="mailto:sales@grasshawk.com" style={{ 
                color: '#2563eb',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                wordBreak: 'break-all'
              }}>sales@grasshawk.com</a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          background: '#ffffff',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          borderRadius: 'clamp(12px, 3vw, 16px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            lineHeight: '1.3'
          }}>
            Send Us a Message
          </h3>
          
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                fontWeight: '500',
                color: '#1a202c',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px)',
                  border: '1px solid #d1d5db',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  boxSizing: 'border-box',
                  minHeight: '44px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                fontWeight: '500',
                color: '#1a202c',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px)',
                  border: '1px solid #d1d5db',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  boxSizing: 'border-box',
                  minHeight: '44px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                fontWeight: '500',
                color: '#1a202c',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}>
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px)',
                  border: '1px solid #d1d5db',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  boxSizing: 'border-box',
                  minHeight: '44px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                fontWeight: '500',
                color: '#1a202c',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}>
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us more about your inquiry..."
                style={{
                  width: '100%',
                  padding: 'clamp(10px, 2.5vw, 12px)',
                  border: '1px solid #d1d5db',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  resize: 'vertical',
                  minHeight: 'clamp(100px, 20vw, 120px)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 4vw, 24px)',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                minHeight: '44px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleContact;

