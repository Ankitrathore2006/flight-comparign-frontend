import React, { useState } from 'react';
import { MapPin, Star, Calendar, Users, Plane, Search } from 'lucide-react';
import '../styles/destinations.css';

const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');

  const continents = [
    { id: 'all', name: 'All Destinations' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'americas', name: 'Americas' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      continent: 'europe',
      description: 'The City of Light, known for its art, fashion, and culture.',
      rating: 4.8,
      price: 'From $499',
      bestTime: 'April - June',
      popular: true
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      continent: 'asia',
      description: 'A vibrant mix of traditional culture and modern technology.',
      rating: 4.9,
      price: 'From $899',
      bestTime: 'March - May',
      popular: true
    },
    {
      id: 3,
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D',
      continent: 'americas',
      description: 'The city that never sleeps, offering endless possibilities.',
      rating: 4.7,
      price: 'From $699',
      bestTime: 'September - November',
      popular: true
    },
    {
      id: 4,
      name: 'Cape Town, South Africa',
      image: 'https://images.unsplash.com/photo-1585061528750-3baca2cb6a10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      continent: 'africa',
      description: 'Stunning landscapes and rich cultural heritage.',
      rating: 4.6,
      price: 'From $799',
      bestTime: 'November - March',
      popular: false
    },
    {
      id: 5,
      name: 'Sydney, Australia',
      image: 'https://media.istockphoto.com/id/801269928/photo/aerial-view-of-sydney-city.webp?a=1&b=1&s=612x612&w=0&k=20&c=icjxDmBWkg4OGMIcsdchr1rUGi2nDGI_eZsSgIAFSUs=',
      continent: 'oceania',
      description: 'Beautiful beaches and iconic landmarks.',
      rating: 4.7,
      price: 'From $999',
      bestTime: 'September - November',
      popular: true
    },
    {
      id: 6,
      name: 'Rome, Italy',
      image: 'https://media.istockphoto.com/id/539115110/photo/colosseum-in-rome-and-morning-sun-italy.webp?a=1&b=1&s=612x612&w=0&k=20&c=YLbEWFTxnvmIGrzV7XPEMXuL41KdVYEy00TZQoVDTrg=',
      continent: 'europe',
      description: 'Ancient history meets modern Italian culture.',
      rating: 4.8,
      price: 'From $599',
      bestTime: 'April - June',
      popular: true
    }
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'all' || destination.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="destinations-page">
      
      {/* Hero Section */}
      <section className="destinations__hero">
        <div className="section__container">
          <h1 className="section__header_about">Explore Our Destinations</h1>
          <p className="hero__subtitle">Discover amazing places around the world with our exclusive deals</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="destinations__search">
        <div className="section__container">
          <div className="search__container">
            <div className="search__input">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="continent__filters">
              {continents.map(continent => (
                <button
                  key={continent.id}
                  className={`continent__filter ${selectedContinent === continent.id ? 'active' : ''}`}
                  onClick={() => setSelectedContinent(continent.id)}
                >
                  {continent.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section__container destinations__grid">
        {filteredDestinations.map(destination => (
          <div key={destination.id} className="destination__card">
            <div className="destination__image">
              <img src={destination.image} alt={destination.name} />
              {destination.popular && <div className="popular__tag">Popular</div>}
            </div>
            <div className="destination__content">
              <div className="destination__header">
                <h3>{destination.name}</h3>
                <div className="destination__rating">
                  <Star size={16} fill="currentColor" />
                  <span>{destination.rating}</span>
                </div>
              </div>
              <p className="destination__description">{destination.description}</p>
              <div className="destination__details">
                <div className="detail">
                  <Calendar size={16} />
                  <span>Best Time: {destination.bestTime}</span>
                </div>
                <div className="detail">
                  <Plane size={16} />
                  <span>{destination.price}</span>
                </div>
              </div>
              <button className="btn">Explore More</button>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Destinations */}
      <section className="destinations__featured">
        <div className="section__container">
          <h2 className="section__header_about">Featured Destinations</h2>
          <div className="featured__grid">
            {destinations
              .filter(destination => destination.popular)
              .map(destination => (
                <div key={destination.id} className="featured__card">
                  <img src={destination.image} alt={destination.name} />
                  <div className="featured__content">
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <button className="btn btn--outline">View Details</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage; 