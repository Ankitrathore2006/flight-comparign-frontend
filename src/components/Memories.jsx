import React, { useState } from 'react';

const Memories = () => {
  const [showAll, setShowAll] = useState(false);

  const memories = [
    {
      id: 1,
      icon: 'ri-calendar-2-line',
      title: 'Book & relax',
      description: 'With "Book and Relax," you can sit back, unwind, and enjoy the journey while we take care of everything else.'
    },
    {
      id: 2,
      icon: 'ri-shield-check-line',
      title: 'Smart Checklist',
      description: 'Introducing Smart Checklist with us, the innovative solution revolutionizing the way you travel with our airline.'
    },
    {
      id: 3,
      icon: 'ri-bookmark-2-line',
      title: 'Save More',
      description: 'From discounted ticket prices to exclusive promotions and deals, we prioritize affordability without compromising on quality.'
    }
  ];

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="memories">
      <div className="section__container memories__container">
        <div className="memories__header">
          <h2 className="section__header">
            Travel to make memories all around the world
          </h2>
          <button 
            className="view__all"
            onClick={handleViewAll}
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
        <div className="memories__grid">
          {memories.map((memory) => (
            <div 
              key={memory.id} 
              className={`memories__card ${showAll ? 'expanded' : ''}`}
            >
              <span>
                <i className={memory.icon} ></i>
              </span>
              <h4>{memory.title}</h4>
              <p>{memory.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories; 