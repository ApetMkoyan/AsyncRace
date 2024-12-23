import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WinnersControl = () => {
    const [winners, setWinners] = useState([]);
    const [newWinner, setNewWinner] = useState({ id: '', wins: 0, time: 0 });

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4000/winners');
                setWinners(response.data);
            } catch (error) {
                console.error('Error fetching winners:', error);
            }
        };
        fetchWinners();
    }, []);

    const handleAddWinner = async () => {
        if (!newWinner.id || newWinner.wins < 0 || newWinner.time <= 0) return;
        try {
            const response = await axios.post('http://127.0.0.1:4000/winners', newWinner);
            setWinners([...winners, response.data]);
            setNewWinner({ id: '', wins: 0, time: 0 });
        } catch (error) {
            console.error('Error adding winner:', error);
        }
    };

    const handleDeleteWinner = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:4000/winners/${id}`);
            setWinners(winners.filter(winner => winner.id !== id));
        } catch (error) {
            console.error('Error deleting winner:', error);
        }
    };

    return (
        <div>
            <h2>Winners</h2>
            <div>
                <input
                    type="number"
                    placeholder="Winner ID"
                    value={newWinner.id}
                    onChange={(e) => setNewWinner({ ...newWinner, id: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Wins"
                    value={newWinner.wins}
                    onChange={(e) => setNewWinner({ ...newWinner, wins: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Time"
                    value={newWinner.time}
                    onChange={(e) => setNewWinner({ ...newWinner, time: e.target.value })}
                />
                <button onClick={handleAddWinner}>Add Winner</button>
            </div>

            <ul>
                {winners.map((winner) => (
                    <li key={winner.id}>
                        {winner.id} - Wins: {winner.wins}, Time: {winner.time}s
                        <button onClick={() => handleDeleteWinner(winner.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WinnersControl;
