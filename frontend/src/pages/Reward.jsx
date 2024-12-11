import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reward = () => {
    const [coins, setCoins] = useState(0); // To store the current coin balance
    const [clickedBoxes, setClickedBoxes] = useState(new Set()); // Track clicked boxes

    // Fetch user coins from the server when component mounts
    useEffect(() => {
        const fetchUserCoins = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get('/api/user/data'); // Modify according to your endpoint
                setCoins(response.data.coins);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserCoins();
    }, []);

    // Handle box click
    const handleBoxClick = async (boxNumber) => {
        if (!clickedBoxes.has(boxNumber)) {
            clickedBoxes.add(boxNumber);
            setClickedBoxes(new Set(clickedBoxes));

            try {
                const response = await axios.put('/api/user/update-coins'); // Modify according to your endpoint
                setCoins(response.data.coins); // Update the coin balance
            } catch (error) {
                console.error("Error updating coins:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reward</h1>
            <p className="text-lg text-gray-600 mb-6">Coin: {coins}</p>
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((box) => (
                    <div
                        key={box}
                        className={`flex items-center justify-center w-16 h-16 rounded-lg cursor-pointer ${clickedBoxes.has(box) ? 'bg-green-500 text-white' : 'bg-gray-300'} hover:bg-green-400 transition-all duration-200 ease-in-out`}
                        onClick={() => handleBoxClick(box)}
                    >
                        Box {box}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reward;
