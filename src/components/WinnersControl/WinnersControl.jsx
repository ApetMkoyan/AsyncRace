import React from 'react';
import './WinnersControl.css';

const WinnersControl = ({ winners }) => {
  return (
    <div className="winners">
      <h2>Race Winners</h2>
      {winners.map((car, index) => (
        <div key={car.id} className="winner">
          <span className={`medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}`}>
            {index === 0 ? 'Gold' : index === 1 ? 'Silver' : 'Bronze'}
          </span>
          <span className="winner-name">{car.name}</span>
        </div>
      ))}
    </div>
  );
};

export default WinnersControl;
