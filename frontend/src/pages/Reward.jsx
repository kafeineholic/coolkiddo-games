import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Reward = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [userCoins, setUserCoins] = useState(0);
    const [clickedDays, setClickedDays] = useState(new Array(7).fill(false));

    // fetch user's current coins from db
    useEffect(() => {
        if (userData) {
            setUserCoins(userData.coins || 0);
        }
    }, [userData]);

    const handleBoxClick = async (index) => {
        if (clickedDays[index]) {
            toast.error("You've already claimed this day's reward!");
            return;
        }
    
        // request payload
        console.log("Sending API request with:", {
            userId: userData._id, 
            coins: 1
        });
    
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/user/update-coins`,
                { userId: userData._id, coins: 1 },
                { withCredentials: true }
            );
    
            if (data.success) {
                toast.success('You earned 1 coin!');
                setUserCoins(data.coins);
                setClickedDays((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                });
            } else {
                toast.error(data.message || 'Error updating coins');
            }
        } catch (error) {
            console.error('Error updating coins:', error);
            toast.error('An error occurred while claiming the reward.');
        }
    };
    

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Daily Rewards</h1>
            <p className="mb-6 text-lg">Your Coins: {userCoins}</p>
            <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-20 h-20 flex items-center justify-center text-lg font-semibold cursor-pointer 
                            ${clickedDays[index] ? 'bg-gray-300' : 'bg-green-500 text-white'}
                            hover:opacity-80`}
                        onClick={() => handleBoxClick(index)}
                    >
                        {clickedDays[index] ? 'Claimed' : `Day ${index + 1}`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reward;
