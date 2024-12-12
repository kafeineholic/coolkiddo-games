import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const Reward = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [userCoins, setUserCoins] = useState(0);
    const [isClaimed, setIsClaimed] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0); // Time in seconds
    const [loading, setLoading] = useState(true);

    const userId = userData?._id;

    // Fetch coins and claim status
    const fetchCoins = async () => {
        if (!userId) {
            console.error('User ID not found');
            toast.error('User ID not found. Please log in again.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-coins/${userId}`, { withCredentials: true });

            if (data.success) {
                setUserCoins(data.coins);
                const lastClaimTime = data.lastClaimTime;

                if (lastClaimTime) {
                    const timeDiff = Math.floor((new Date().getTime() - new Date(lastClaimTime).getTime()) / 1000);
                    if (timeDiff < 86400) { // Less than 24 hours
                        setIsClaimed(true);
                        setRemainingTime(86400 - timeDiff); // Remaining time in seconds
                    } else {
                        setIsClaimed(false);
                        setRemainingTime(0); // Reset the remaining time
                    }
                } else {
                    setIsClaimed(false);
                    setRemainingTime(0);
                }
            } else {
                toast.error(data.message || 'Failed to fetch coins');
            }
        } catch (error) {
            console.error('Error fetching coins:', error.message);
            toast.error('An error occurred while fetching your coins.');
        }
        setLoading(false);
    };

    // Claim the coin and update the backend and UI
    const claimCoin = async () => {
        if (isClaimed) {
            toast.error('You have already claimed your coin today.');
            return;
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/claim-coin/${userId}`, {}, { withCredentials: true });

            if (data.success) {
                setUserCoins(data.coins);
                setIsClaimed(true); // Update isClaimed to true after successful claim
                setRemainingTime(86400); // Reset the remaining time to 24 hours

                // Update last claim time in localStorage
                localStorage.setItem('lastClaimTime', new Date().toISOString());

                toast.success('Successfully claimed your coin!');
            } else {
                toast.error(data.message || 'Failed to claim coin');
            }
        } catch (error) {
            console.error('Error claiming coin:', error);
            toast.error('You have already claimed reward for today.');
        }
    };

    // Countdown logic for remaining time
    useEffect(() => {
        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval); // Stop interval when time reaches 0
                        setIsClaimed(false); // Reset claim status after 24 hours
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval); // Clean up interval on component unmount
        }
    }, [remainingTime]);

    // Fetch data and check claim status
    useEffect(() => {
        if (userData) {
            fetchCoins();
        }
    }, [userData]);

    // Reset claim status if more than 24 hours passed since last claim
    useEffect(() => {
        const lastClaimTime = localStorage.getItem('lastClaimTime');
        if (lastClaimTime) {
            const timeDiff = Math.floor((new Date().getTime() - new Date(lastClaimTime).getTime()) / 1000);
            if (timeDiff >= 86400) {
                setIsClaimed(false); // Reset claim status
                setRemainingTime(0); // Reset remaining time
            }
        }
    }, []);

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (!userData) {
        return <p className="text-center text-lg">Loading user data...</p>;
    }

    return (
        <div className="reward-container max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">My Rewards</h1>
            <p className="text-center text-lg mb-4">You have <strong>{userCoins}</strong> coins.</p>

            <div className="text-center mt-6">
                {isClaimed ? (
                    <div>
                        <p className="text-sm mb-2">You have already claimed your coin today.</p>
                        <p className="text-sm mb-4">Next claim available in: <strong>{formatTime(remainingTime)}</strong></p>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm mb-4">Claim your coin now!</p>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                            onClick={claimCoin}
                            disabled={isClaimed || remainingTime > 0}
                        >
                            Claim Coin
                        </button>
                    </div>
                )}
            </div>

            {isClaimed && remainingTime > 0 && (
                <div className="text-center mt-6">
                    <p className="text-sm mb-4">Your next claim is available in:</p>
                    <p className="text-lg font-bold">{formatTime(remainingTime)}</p>
                </div>
            )}

            <div className="text-center mt-6">
                {!isClaimed && remainingTime === 0 && (
                    <img src="path_to_image.jpg" alt="Reward Box" className="w-48 h-48 mx-auto mb-4" />
                )}
            </div>
        </div>
    );
};

export default Reward;
export const claimCoinForDay = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentDate = new Date();

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const lastClaimTime = user.lastClaimTime;
        const timeDiff = lastClaimTime ? Math.floor((currentDate - lastClaimTime) / 1000) : 86401; // Time difference in seconds

        if (timeDiff < 86400) {  
            return res.status(400).json({
                success: false, 
                message: "You have already claimed your coin for today.",
                remainingTime: 86400 - timeDiff // Remaining time until next claim
            });
        }

        user.coins += 1;
        user.lastClaimTime = currentDate;  // Store the current date as the last claim time
        await user.save();

        // Return the updated coin count and last claim time
        res.status(200).json({
            success: true, 
            coins: user.coins, 
            lastClaimTime: user.lastClaimTime.toISOString(),
            remainingTime: 86400 // Full 24 hours until next claim
        });
    } catch (error) {
        console.error("Error claiming coin:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
