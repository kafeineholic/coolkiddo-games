import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:5010/api/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfileData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Full Name:</strong> {userData.full_name}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
        </div>

    );
};

export default Profile;