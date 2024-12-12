import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reward = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [userCoins, setUserCoins] = useState(0);
    const [claimedDays, setClaimedDays] = useState([false, false, false, false, false, false, false]); // 7 days of the week
    const [loading, setLoading] = useState(true);

    const userId = userData?._id;

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

                // Set claimedDays from the API, and also ensure localStorage is synced.
                const updatedClaimedDays = Array.isArray(data.claimedDays) ? data.claimedDays : [false, false, false, false, false, false, false];
                setClaimedDays(updatedClaimedDays);

                // Persist claimedDays in localStorage for persistence across page reloads
                localStorage.setItem('claimedDays', JSON.stringify(updatedClaimedDays));
            } else {
                toast.error(data.message || 'Failed to fetch coins');
            }
        } catch (error) {
            console.error('Error fetching coins:', error.message);
            toast.error('An error occurred while fetching your coins.');
        }
        setLoading(false);
    };

    const claimCoin = async (dayIndex) => {
        if (claimedDays[dayIndex]) {
            toast.error('You have already claimed this day.');
            return;
        }

        const currentDate = new Date();
        const currentDay = currentDate.getDay();

        if (dayIndex !== currentDay) {
            toast.error('Please wait until today to claim your coin.');
            return;
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/claim-coin/${userId}`);

            if (data.success) {
                setUserCoins(data.coins);
                const newClaimedDays = [...claimedDays];
                newClaimedDays[dayIndex] = true;
                setClaimedDays(newClaimedDays);

                // Persist the updated claimedDays to localStorage
                localStorage.setItem('claimedDays', JSON.stringify(newClaimedDays));
                toast.success('Successfully Claimed Coin');
            } else {
                toast.error(data.message || 'Failed to claim coin');
            }
        } catch (error) {
            console.error('Error claiming coin:', error);
            toast.error('You have already claim coin for today.');

            // In case of an error (e.g., 400 Bad Request), update the UI state to reflect the claim was unsuccessful
            if (error.response?.status === 400) {
                const newClaimedDays = [...claimedDays];
                newClaimedDays[dayIndex] = true;
                setClaimedDays(newClaimedDays);

                // Persist the updated claimedDays to localStorage
                localStorage.setItem('claimedDays', JSON.stringify(newClaimedDays));
            }
        }
    };

    useEffect(() => {
        // Load claimedDays from localStorage on component mount
        const savedClaimedDays = localStorage.getItem('claimedDays');
        if (savedClaimedDays) {
            setClaimedDays(JSON.parse(savedClaimedDays));
        }

        if (userData) {
            fetchCoins();
        }
    }, [userData]);

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

            <div className="reward-grid grid grid-cols-7 gap-4 mt-6">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                    <div
                        key={index}
                        className={`reward-box text-center py-4 rounded-lg transition-all duration-300
                            ${claimedDays[index] ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'}`}
                        onClick={() => !claimedDays[index] && claimCoin(index)}
                        style={{ cursor: claimedDays[index] ? 'not-allowed' : 'pointer' }}
                    >
                        <p className="font-medium">{day}</p>
                        {claimedDays[index] && <p className="mt-2 text-sm text-green-600">Claimed</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reward;
