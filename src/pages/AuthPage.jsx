import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import '../styles/auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState('500px');
  const navigate = useNavigate();
  const { authUser, login, signup, isLoggingIn, isSigningUp } = useAuthStore();

  useEffect(() => {
    // Update wrapper height based on form type
    setWrapperHeight(isLogin ? '500px' : '580px');
  }, [isLogin]);

  useEffect(() => {
    // Redirect if user is already authenticated
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        if (!agreeTerms) {
          alert('Please agree to the terms and conditions');
          return;
        }
        await signup(formData);
      }
      navigate('/');
    } catch (error) {
      console.error(isLogin ? 'Login failed:' : 'Signup failed:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* <div className="video-container">
        <video
          src="/images/v.mp4"
          autoPlay
          muted
          loop
        />
      </div> */}

      {/* <img src="/images/header.jpg" alt="header" /> */}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
          <div className="wrapper" style={{ height: wrapperHeight }}>
            <div className="form-header">
              <div className="titles">
                <div
                  className={`title-login ${isLogin ? 'active' : ''}`}
                  style={{
                    top: isLogin ? '50%' : '-60px',
                    opacity: isLogin ? 1 : 0
                  }}
                >
                  Login
                </div>
                <div
                  className={`title-register ${!isLogin ? 'active' : ''}`}
                  style={{
                    top: !isLogin ? '50%' : '50px',
                    opacity: !isLogin ? 1 : 0
                  }}
                >
                  Register
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className={`login-form ${isLogin ? 'active' : ''}`}
              autoComplete="off"
              style={{
                left: isLogin ? '50%' : '-50%',
                opacity: isLogin ? 1 : 0
              }}
            >
              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  id="log-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="log-email" className="label">Email</label>
                <Mail className="icon1" size={20} />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  id="log-pass"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="log-pass" className="label">Password</label>
                <Lock className="icon1" size={20} />
              </div>
              <div className="form-cols">
                <div className="col-1"></div>
                <div className="col-2">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              </div>
              <div className="input-box">
                <button className="btn-submit" type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      Sign In
                      <LogIn size={20} />
                    </>
                  )}
                </button>
              </div>
              <div className="switch-form">
                <span>Don't have an account? <a href="#" onClick={toggleForm}>Register</a></span>
              </div>
            </form>

            {/* Register Form */}
            <form
              onSubmit={handleSubmit}
              className={`register-form ${!isLogin ? 'active' : ''}`}
              autoComplete="off"
              style={{
                left: !isLogin ? '50%' : '150%',
                opacity: !isLogin ? 1 : 0
              }}
            >
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  id="reg-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="reg-name" className="label">Username</label>
                <User className="icon1" size={20} />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  id="reg-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="reg-email" className="label">Email</label>
                <Mail className="icon1" size={20} />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  id="reg-pass"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="reg-pass" className="label">Password</label>
                <Lock className="icon11" size={20} />
              </div>
              <div className="form-cols">
                <div className="col-1">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <label htmlFor="agree">I agree to terms & conditions</label>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="input-box">
                <button className="btn-submit" type="submit" disabled={isSigningUp || !agreeTerms}>
                  {isSigningUp ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      Sign Up
                      <UserPlus size={20} />
                    </>
                  )}
                </button>
              </div>
              <div className="switch-form">
                <span>Already have an account? <a href="#" onClick={toggleForm}>Login</a></span>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default AuthPage; 