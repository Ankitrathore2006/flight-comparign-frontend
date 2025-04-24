import React from 'react';

const Lounge = () => {
  return (
    <section className="section__container lounge__container">
      <div className="lounge__image">
        <img src="/images/lounge-1.jpg" alt="lounge" />
        <img src="/images/lounge-2.jpg" alt="lounge" />
      </div>
      <div className="lounge__content">
        <h2 className="section__header">Unaccompanied Minor Lounge</h2>
        <div className="lounge__grid">
          <div className="lounge__details">
            <h4>Experience Tranquility</h4>
            <p>
              Serenity Haven offers a tranquil escape, featuring comfortable
              seating, calming ambiance, and attentive service.
            </p>
          </div>
          <div className="lounge__details">
            <h4>Elevate Your Experience</h4>
            <p>
              Designed for discerning travelers, this exclusive lounge offers
              premium amenities, assistance, and private workspaces.
            </p>
          </div>
          <div className="lounge__details">
            <h4>A Welcoming Space</h4>
            <p>
              Creating a family-friendly atmosphere, The Family Zone is the
              perfect haven for parents and children.
            </p>
          </div>
          <div className="lounge__details">
            <h4>A Culinary Delight</h4>
            <p>
              Immerse yourself in a world of flavors, offering international
              cuisines, gourmet dishes, and carefully curated beverages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lounge; 