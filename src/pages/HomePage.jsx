import React from 'react';
// import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Plan from '../components/Plan';
import Memories from '../components/Memories';
import Lounge from '../components/Lounge';
import Travellers from '../components/Travellers';
import Subscribe from '../components/Subscribe';

const HomePage = () => {
  return (
    <div className="home">
      {/* <Navbar /> */}
      <Header />
      <Plan />
      <Banner />
      <Memories />
      <Lounge />
      <Travellers />
      <Subscribe />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
