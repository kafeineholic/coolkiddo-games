import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Leaderboard = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const fetchLeaderboard = async () => {
        if (!userData?._id) {
            console.error('User ID not found');
            toast.error('User ID not found. Please log in again.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/leaderboard`, {
                withCredentials: true,
            });

            if (data.success) {
                setLeaderboard(data.leaderboard);
            } else {
                toast.error('Failed to fetch leaderboard data');
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error.message);
            toast.error('An error occurred while fetching leaderboard data');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (userData) {
            fetchLeaderboard();
        }
    }, [userData]);

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (!userData) {
        return <p className="text-center text-lg">Loading user data...</p>;
    }

    return (
        <div className="leaderboard-container max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Rank</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Coins</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr
                            key={index}
                            className={user.isCurrentUser ? 'bg-yellow-200' : 'bg-white'}
                        >
                            <td className="py-2 px-4">{user.rank}</td>
                            <td className="py-2 px-4">{user.isCurrentUser ? 'Me' : user.name}</td>
                            <td className="py-2 px-4">{user.coins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
