import React, { useState } from 'react';
import { translations } from '../utils/translations';

const Register = ({ onClose, onSwitchToLogin, onRegister, language = 'en' }) => {
  const t = translations[language] || translations.en;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('Register component rendered!');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register attempt:', { name, email, password });
    if (typeof onRegister === 'function') {
      const result = await onRegister({ name, email, password });
      if (result && result.success) {
        onClose();
      } else {
        alert(result?.message || 'Registration failed');
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Solid backdrop to block content behind */}
      <div 
        className="modal-backdrop-enhanced"
        onClick={onClose}
      />
      {/* Modal container - centered */}
      <div className="modal-container-centered">
        {/* Modal Content */}
        <div 
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            width: '100%',
            maxHeight: '60vh',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 10001,
            overflow: 'auto',
            border: '1px solid #e5e7eb',
            isolation: 'isolate',
            backdropFilter: 'blur(10px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px'
          }}>
            <h2 style={{ 
              margin: 0, 
              color: '#333', 
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              {t.auth.signUp}
            </h2>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#999',
                padding: '5px',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div style={{ 
              marginBottom: '12px',
              display: 'block'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#333',
                fontWeight: '600',
                fontSize: '13px'
              }}>
                {t.auth.fullName}
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={t.auth.fullNamePlaceholder}
                style={{ 
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* Email Field */}
            <div style={{ 
              marginBottom: '12px',
              display: 'block'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#333',
                fontWeight: '600',
                fontSize: '13px'
              }}>
                {t.auth.email}
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t.auth.emailPlaceholder}
                style={{ 
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            {/* Password Field */}
            <div style={{ 
              marginBottom: '16px',
              display: 'block'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#333',
                fontWeight: '600',
                fontSize: '13px'
              }}>
                {t.auth.password}
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t.auth.passwordPlaceholder}
                style={{ 
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              style={{ 
                width: '100%',
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                marginBottom: '12px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              {t.auth.signUp}
            </button>
          </form>
          
          {/* Footer */}
          <div style={{ 
            textAlign: 'center',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            <p style={{ 
              margin: 0, 
              color: '#666',
              fontSize: '14px'
            }}>
              {t.auth.hasAccount}{' '}
              <button 
                onClick={onSwitchToLogin}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#007bff', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {t.auth.signIn}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;