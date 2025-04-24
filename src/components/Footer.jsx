import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    // You can add your social media links here
    const socialLinks = {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
    };
    window.open(socialLinks[platform], '_blank');
  };

  return (
    <footer className="footer">
      <div className="section__container footer__container">
        <div className="footer__col">
          <h3>FlightHunt.</h3>
          <p>
            Where Excellence Takes Flight. With a strong commitment to customer
            satisfaction and a passion for air travel, FlightHunt Airlines offers
            exceptional service and seamless journeys.
          </p>
          <p>
            From friendly smiles to state-of-the-art aircraft, we connect the
            world, ensuring safe, comfortable, and unforgettable experiences.
          </p>
        </div>
        <div className="footer__col">
          <h4>INFORMATION</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/destinations">Destinations</Link>
          {/* <Link to="/seats">Seats</Link> */}
          {/* <Link to="/contact">Contact</Link> */}
        </div>
        <div className="footer__col">
          <h4>CONTACT</h4>
          <Link to="/contact">Support</Link>
          <Link to="/contact">Media</Link>
          <Link to="/contact">Socials</Link>
        </div>
      </div>
      <div className="section__container footer__bar">
        <p>Copyright © {currentYear} FlightHunt. All rights reserved.</p>
        <div className="socials">
          <span onClick={() => handleSocialClick('facebook')}>
            <i className="ri-facebook-fill" style={{ display: 'inline-block', fontSize: '20px' }}></i>
          </span>
          <span onClick={() => handleSocialClick('twitter')}>
            <i className="ri-twitter-fill" style={{ display: 'inline-block', fontSize: '20px' }}></i>
          </span>
          <span onClick={() => handleSocialClick('instagram')}>
            <i className="ri-instagram-line" style={{ display: 'inline-block', fontSize: '20px' }}></i>
          </span>
          <span onClick={() => handleSocialClick('youtube')}>
            <i className="ri-youtube-fill" style={{ display: 'inline-block', fontSize: '20px' }}></i>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 