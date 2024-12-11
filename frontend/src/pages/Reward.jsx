import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Reward = () => {
    const [coins, setCoins] = useState(0);  
    const [clickedBoxes, setClickedBoxes] = useState(new Set()); 
    
    
    const { userData, backendUrl, setUserData } = useContext(AppContext);
    axios.defaults.withCredentials = true
    
    useEffect(() => {
        if (userData) {
            setCoins(userData.coins); 
        }
    }, [userData]);

    const handleBoxClick = async (boxNumber) => {
        if (!clickedBoxes.has(boxNumber)) {
            const newClickedBoxes = new Set(clickedBoxes);
            newClickedBoxes.add(boxNumber);
            setClickedBoxes(newClickedBoxes);
    
            const newCoinCount = (coins || 0) + 1;
            setCoins(newCoinCount);
    
            try {
                console.log("Request payload:", {
                    userId: userData?.id,
                    coins: newCoinCount
                });
    
                const { data } = await axios.put(
                    `${backendUrl}/api/user/update-coins`,
                    { userId: userData?.id, coins: newCoinCount }
                );
    
                setUserData(data.userData);
            } catch (error) {
                console.error("Error updating coins:", {
                    message: error.response?.data?.message || error.message,
                    data: error.response?.data,
                    status: error.response?.status
                });
            }
        }
    };
    
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reward</h1>
            <p className="text-lg text-gray-600 mb-6">Coins: {coins}</p>
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
