import React from 'react';

const Subscribe = () => {
  return (
    <section className="subscribe">
      <div className="section__container subscribe__container">
        <h2 className="section__header">Subscribe newsletter & get latest news</h2>
        <form className="subscribe__form">
          <input type="text" placeholder="Enter your email here" />
          <button className="btn" style={{ width: '12rem' }}>Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe; 