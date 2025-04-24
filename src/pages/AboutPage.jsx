import React from 'react';
import { Users, Award, Globe, Shield, Heart, Star } from 'lucide-react';
import '../styles/about.css';

const AboutPage = () => {
  const stats = [
    { number: '10M+', label: 'Happy Customers', icon: Users },
    { number: '50+', label: 'Destinations', icon: Globe },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '99%', label: 'Customer Satisfaction', icon: Heart }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. We maintain the highest safety standards across all our operations.'
    },
    {
      icon: Star,
      title: 'Quality Service',
      description: 'We are committed to providing exceptional service and creating memorable travel experiences.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'With our extensive network, we connect you to destinations worldwide with ease.'
    }
  ];

  return (
    <div className="about-page">
      
      {/* Hero Section */}
      <section className="about__hero">
        <div className="section__container">
          <h1 className="section__header_about">About FlightHunt</h1>
          <p className="hero__subtitle">Your Journey, Our Passion</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section__container about__story">
        <div className="story__content">
          <h2 className="section__header">Our Story</h2>
          <p>
            Founded in 2008, FlightHunt began with a simple mission: to make air travel accessible, 
            affordable, and enjoyable for everyone. What started as a small team of travel enthusiasts 
            has grown into a leading force in the aviation industry.
          </p>
          <p>
            Today, we serve millions of customers worldwide, offering seamless booking experiences 
            and exceptional customer service. Our commitment to innovation and customer satisfaction 
            has earned us numerous accolades and the trust of travelers globally.
          </p>
        </div>
        <div className="story__image">
          <img src="/images/th.jpg" alt="FlightHunt Team" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="about__stats">
        <div className="section__container">
          <div className="stats__grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat__card">
                  <div className="stat__icon">
                    <Icon size={32} />
                  </div>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section__container about__values">
        <h2 className="section__header">Our Core Values</h2>
        <div className="values__grid">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="value__card">
                <div className="value__icon">
                  <Icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="about__team">
        <div className="section__container">
          <h2 className="section__header">Meet Our Leadership</h2>
          <div className="team__grid">
            <div className="team__member">
              <img src="/images/client-1.jpg" alt="CEO" />
              <h3>John Smith</h3>
              <p>Chief Executive Officer</p>
            </div>
            <div className="team__member">
              <img src="/images/client-2.jpg" alt="COO" />
              <h3>Sarah Johnson</h3>
              <p>Chief Operations Officer</p>
            </div>
            <div className="team__member">
              <img src="/images/client-3.jpg" alt="CTO" />
              <h3>Michael Chen</h3>
              <p>Chief Technology Officer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 