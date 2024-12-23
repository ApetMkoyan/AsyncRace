import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarControl = () => {
  const [carData, setCarData] = useState(null);
  const [carId, setCarId] = useState(1);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/garage/${carId}`);
        setCarData(response.data); 
      } catch (error) {
        console.error('Ошибка при получении данных о машине:', error);
      }
    };

    fetchCarData(); 
  }, [carId]); 

  if (!carData) {
    return <div>Загружается информация о машине...</div>;
  }

  const engineStatus = carData?.engineStatus || 'Неизвестно';
  return (
    <div>
      <h2>Управление автомобилем</h2>
      <p>Имя машины: {carData.name}</p>
      <p>Цвет: {carData.color}</p>
      <p>Статус двигателя: {engineStatus}</p>
    </div>
  );
};

export default CarControl;
