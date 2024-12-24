import React from 'react';

const RaceControl = ({ startRace, resetRace, stopRace, raceInProgress }) => (
  <div className="race-control">
    <button onClick={startRace} disabled={raceInProgress}>Start Race</button>
    <button onClick={resetRace} disabled={raceInProgress}>Reset Race</button>
    <button onClick={stopRace} disabled={!raceInProgress}>Stop Race</button>
  </div>
);

export default RaceControl;
