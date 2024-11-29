import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        sex: '',
        date_of_birth: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.full_name) formErrors.full_name = 'Full name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.username) formErrors.username = 'Username is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (!formData.sex) formErrors.sex = 'Sex is required';
        if (!formData.date_of_birth) formErrors.date_of_birth = 'Date of birth is required';
        if (!formData.phone) formErrors.phone = 'Phone number is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5010/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Registration successful!');
                    navigate('/login');
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-white">
            <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white text-zinc-600">
                <h3 className="text-center text-2xl text-primary mb-6">Register</h3>
                <form onSubmit={handleSubmit}>
                    {[
                        { name: 'full_name', label: 'Full Name', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'username', label: 'Username', type: 'text' },
                        { name: 'password', label: 'Password', type: 'password' },
                        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
                        { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
                        { name: 'phone', label: 'Phone', type: 'text' },
                    ].map(({ name, label, type }) => (
                        <div className="mb-4" key={name}>
                            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type={type}
                                id={name}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 mt-2 text-sm rounded-md focus:outline-none ${
                                    errors[name] ? 'border-2 border-red-500' : 'border-2 border-zinc-300'
                                } bg-zinc-100 text-zinc-600`}
                            />
                            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                        </div>
                    ))}
                    <div className="mb-4">
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
                        <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 mt-2 text-sm rounded-md focus:outline-none ${
                                errors.sex ? 'border-2 border-red-500' : 'border-2 border-zinc-300'
                            } bg-zinc-100 text-zinc-600`}
                        >
                            <option value="">Select your sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="LGBTQ+">LGBTQ+</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex}</p>}
                    </div>
                    <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg hover:bg-white hover:text-primary hover:border hover:border-primary transition duration-300">
                        Register
                    </button>
                </form>
                <p className="text-center text-zinc-600 mt-4">
                    Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
