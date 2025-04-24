import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/banner.css';

const Banner = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/flight');
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Find the best flight deals and explore the world with us</p>
        <button className="explore-button" onClick={handleExploreClick}>
          Explore Flights
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Banner; 