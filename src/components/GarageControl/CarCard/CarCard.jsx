import React from 'react';
import './CarCard.css'; 

const CarCard = ({ car, handleDeleteCar }) => {
  return (
    <div className="car-card">
      <div style={{ backgroundColor: car.color }}>
        <h3>{car.name}</h3>
      </div>
      <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
    </div>
  );
};

export default CarCard;
