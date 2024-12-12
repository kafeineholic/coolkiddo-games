import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Reward = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [userCoins, setUserCoins] = useState(0);
    const [clickedDays, setClickedDays] = useState(new Array(7).fill(false));

    // Fetch user's current coins from the backend or localStorage
    useEffect(() => {
        if (userData) {
            // First, check if coins are available in localStorage
            const storedCoins = localStorage.getItem('userCoins');
            if (storedCoins) {
                setUserCoins(JSON.parse(storedCoins)); // Use stored coins if available
            } else {
                // If no coins in localStorage, fetch from the backend
                const fetchCoins = async () => {
                    try {
                        const { data } = await axios.get(
                            `${backendUrl}/api/user/get-coins/${userData._id}`,
                            { withCredentials: true }
                        );
                        if (data.success) {
                            setUserCoins(data.coins);
                            localStorage.setItem('userCoins', JSON.stringify(data.coins)); // Store coins in localStorage
                        } else {
                            toast.error(data.message || 'Error fetching coins');
                        }
                    } catch (error) {
                        console.error('Error fetching coins:', error);
                        toast.error('An error occurred while fetching coins.');
                    }
                };
                fetchCoins();
            }

            // Retrieve clicked days from localStorage
            const storedClickedDays = JSON.parse(localStorage.getItem('clickedDays')) || new Array(7).fill(false);
            setClickedDays(storedClickedDays);
        }
    }, [userData, backendUrl]);

    const handleBoxClick = async (index) => {
        if (clickedDays[index]) {
            toast.error("You've already claimed this day's reward!");
            return;
        }

        // Request payload
        console.log("Sending API request with:", {
            userId: userData._id,
            coins: 1,
        });

        try {
            const { data } = await axios.put(
                `${backendUrl}/api/user/update-coins`,
                { userId: userData._id, coins: 1 },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success('You earned 1 coin!');
                setUserCoins(data.coins); // Update coins

                // Store the updated coins in localStorage
                localStorage.setItem('userCoins', JSON.stringify(data.coins));

                // Update clickedDays and store in localStorage
                const updatedClickedDays = [...clickedDays];
                updatedClickedDays[index] = true;
                setClickedDays(updatedClickedDays);
                localStorage.setItem('clickedDays', JSON.stringify(updatedClickedDays));
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
