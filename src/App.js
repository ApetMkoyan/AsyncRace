import React from 'react';
import GarageControl from './components/GarageControl';
import WinnersControl from './components/WinnersControl';
import CarControl from './components/CarControl';

const App = () => {
  return (
    <div>
      <h1>Car Race Management</h1>
      <GarageControl />
      <WinnersControl />
      <CarControl />
    </div>
  );
};

export default App;
