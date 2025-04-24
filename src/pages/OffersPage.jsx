import React from 'react';
import { Calendar, Clock, Tag, Plane, Shield, Award, Gift } from 'lucide-react';
import '../styles/offers.css';

const OffersPage = () => {
  const offers = [
    {
      id: 1,
      title: "Summer Getaway Special",
      description: "Book your summer vacation with up to 40% off on select destinations. Limited time offer for flights between June and August.",
      discount: "40% OFF",
      validUntil: "August 31, 2024",
      code: "SUMMER24",
      image: "/images/offer-1.png",
      features: ["Free seat selection", "Extra baggage allowance", "Priority boarding"]
    },
    {
      id: 2,
      title: "Business Class Upgrade",
      description: "Upgrade to Business Class at a fraction of the regular price. Experience luxury travel with premium services.",
      discount: "50% OFF",
      validUntil: "December 31, 2024",
      code: "BUSINESS50",
      image: "/images/offer-2.png",
      features: ["Lounge access", "Premium meals", "Extra legroom"]
    },
    {
      id: 3,
      title: "Family Vacation Package",
      description: "Special rates for family travel. Kids fly free on select routes when booking for the whole family.",
      discount: "KIDS FREE",
      validUntil: "September 30, 2024",
      code: "FAMILY24",
      image: "/images/offer-3.png",
      features: ["Free meals for kids", "Family check-in", "Priority seating"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Price Guarantee",
      description: "We guarantee the best prices for your flights. Found a better deal? We'll match it!"
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Experience our 5-star rated customer service, available 24/7 to assist you."
    },
    {
      icon: Gift,
      title: "Exclusive Rewards",
      description: "Join our loyalty program and earn points on every booking for future discounts."
    }
  ];

  return (
    <div className="offers-page">
      
      {/* Hero Section */}
      <section className="offers__hero">
        <div className="section__container">
          <h1 className="section__header_about">Special Offers & Deals</h1>
          <p className="hero__subtitle">Discover amazing discounts and exclusive packages for your next journey</p>
        </div>
      </section>

      {/* Main Offers Section */}
      <section className="section__container offers__container">
        <div className="offers__grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer__card">
              <div className="offer__image">
                <img src={offer.image} alt={offer.title} />
                <div className="offer__tag">
                  <Tag size={20} />
                  <span>{offer.discount}</span>
                </div>
              </div>
              <div className="offer__content">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer__details">
                  <div className="detail">
                    <Calendar size={20} />
                    <span>Valid until: {offer.validUntil}</span>
                  </div>
                  <div className="detail">
                    <Tag size={20} />
                    <span>Promo Code: {offer.code}</span>
                  </div>
                </div>
                <ul className="offer__features">
                  {offer.features.map((feature, index) => (
                    <li key={index}>
                      <Plane size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="offers__benefits">
        <div className="section__container">
          <h2 className="section__header_about">Why Choose Our Offers?</h2>
          <div className="benefits__grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="benefit__card">
                  <div className="benefit__icon">
                    <Icon size={32} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section__container offers__info">
        <div className="info__card">
          <Clock size={24} />
          <h3>Limited Time Offers</h3>
          <p>Our special deals are available for a limited time only. Book now to secure these exclusive rates.</p>
        </div>
        <div className="info__card">
          <Shield size={24} />
          <h3>Flexible Booking</h3>
          <p>Enjoy flexible booking options with free cancellation on most of our offers.</p>
        </div>
        <div className="info__card">
          <Award size={24} />
          <h3>Best Price Guarantee</h3>
          <p>We guarantee the best prices for your flights. Found a better deal? We'll match it!</p>
        </div>
      </section>
    </div>
  );
};

export default OffersPage; 