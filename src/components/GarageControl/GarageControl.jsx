import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GarageControl.css';
import CarCard from './CarCard/CarCard';
import RaceControl from './RaceControl/RaceControl';
import Pagination from './Pagination/Pagination';
import WinnersControl from '../WinnersControl/WinnersControl';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomCarName = () => {
  const brands = ['Toyota', 'Ford', 'Chevrolet', 'Honda', 'BMW', 'Tesla', 'Audi', 'Mercedes', 'Hyundai', 'Nissan'];
  const models = ['Model S', 'Civic', 'Corolla', 'Mustang', 'Accord', 'Camry', 'A4', 'X5', 'Elantra', 'Altima'];
  const randomBrand = brands[Math.floor(Math.random() * brands.length)];
  const randomModel = models[Math.floor(Math.random() * models.length)];
  return `${randomBrand} ${randomModel}`;
};

const GarageControl = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: '', color: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [winners, setWinners] = useState([]);
  const carsPerPage = 7;

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

  const handleGenerateCars = async () => {
    try {
      const randomCars = Array.from({ length: 100 }, () => ({
        name: getRandomCarName(),
        color: getRandomColor(),
      }));

      const promises = randomCars.map((car) =>
        axios.post('http://127.0.0.1:4000/garage', car)
      );

      const responses = await Promise.all(promises);
      setCars([...cars, ...responses.map((res) => res.data)]);
    } catch (error) {
      console.error('Error generating cars:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/garage/${id}`);  
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startRace = () => {
    console.log('Race Started');

    const carsWithTimes = cars.map((car) => ({
      ...car,
      raceTime: Math.floor(Math.random() * 5000) + 1000, 
    }));

    const sortedCars = carsWithTimes.sort((a, b) => a.raceTime - b.raceTime);

    setTimeout(() => {
      setWinners(sortedCars.slice(0, 3));
    }, 1000);
  };

  const stopRace = () => {
    console.log('Race Stopped');
  };

  const resetRace = () => {
    setWinners([]);
    console.log('Race Reset');
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

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
        <button onClick={handleGenerateCars}>Generate 100 Random Cars</button>
      </div>

      <div className="car-list">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} handleDeleteCar={handleDeleteCar} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(cars.length / carsPerPage)}
        handlePageChange={handlePageChange}
      />

      <RaceControl startRace={startRace} resetRace={resetRace} stopRace={stopRace} />

      {winners.length > 0 && <WinnersControl winners={winners} />}
    </div>
  );
};

export default GarageControl;
