import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GarageControl = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: '', color: '' });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/garage');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleAddCar = async () => {
    if (!newCar.name || !newCar.color) return;
    try {
      const response = await axios.post('http://127.0.0.1:4000/garage', newCar);
      setCars([...cars, response.data]);
      setNewCar({ name: '', color: '' });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/garage/${id}`);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <h2>Garage</h2>
      <div>
        <input
          type="text"
          placeholder="Car Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
        />
        <input
          type="color"
          value={newCar.color}
          onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        />
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.name} ({car.color}) 
            <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GarageControl;
