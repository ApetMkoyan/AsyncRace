import React from 'react';

const WinnersTable = ({ winners }) => {
  return (
    <table className="winners-table">
      <thead>
        <tr>
          <th>Car Number</th>
          <th>Car Icon</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best Time</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => (
          <tr key={winner.id}>
            <td>{winner.id}</td>
            <td><div className="car-icon" style={{ backgroundColor: winner.color }}></div></td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.bestTime}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTable;
