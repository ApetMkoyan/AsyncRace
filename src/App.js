import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GarageControl from './components/GarageControl/GarageControl';
import WinnersControl from './components/WinnersControl/WinnersControl';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GarageControl />} />
        <Route path="/winners" element={<WinnersControl />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
