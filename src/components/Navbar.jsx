import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from "lucide-react";
import toast from 'react-hot-toast';
import '../styles/responsive.css';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoutt = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  // Function to handle image loading
  const handleImageError = (e) => {
    e.target.src = "/avatar.png";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="nav__logo">FlightHunt.</div>
      
      <button 
        className={`menu-btn ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        ref={menuRef}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
        <li className="link"><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li className="link"><Link to="/flight" onClick={() => setIsMenuOpen(false)}>Flights</Link></li>
        <li className="link"><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
        <li className="link"><Link to="/offers" onClick={() => setIsMenuOpen(false)}>Offers</Link></li>
        <li className="link"><Link to="/destinations" onClick={() => setIsMenuOpen(false)}>Destinations</Link></li>
        <li className="link"><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      </ul>

      <div className="nav__auth">
        {authUser ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="profile-pic-container"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img 
                src={ authUser.profilePic || "/avatar.png"}
                alt="Profile" 
                className="profile-pic"
                onError={handleImageError}
              />
              {showDropdown && (
                <div className="profile-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => {
                    setShowDropdown(false);
                    setIsMenuOpen(false);
                  }}>
                    <User size={16} />
                    Profile
                  </Link>
                  <a onClick={handleLogoutt} className="dropdown-item">
                    <LogOut size={16} />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link to="/auth" className="btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 