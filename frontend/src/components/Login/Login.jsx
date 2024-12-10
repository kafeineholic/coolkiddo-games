import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('Both fields are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5010/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      setIsLoading(false);

      if (response.ok) {
        const result = await response.json();
        sessionStorage.setItem('user', JSON.stringify({ name: username, token: result.token }));
        onLogin({ name: username, token: result.token }); // onLogin
        navigate('/'); // redirect to home
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Unable to log in. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-pink-300 flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {/* Username */}
        <div className="">
          <label htmlFor="username-input">
            Username
          </label>
          <input
            className=""
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          {/* icon username<FaUserAlt /> */}
        </div>
        
        {/* Password */}
        <div className="">
          <label htmlFor="password-input">
            Password
          </label>
          <input
            className=""
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {/* icon password <RiLockPasswordFill /> */}

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm cursor-pointer text-primary"
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <button
          className="bg-primary text-white w-full py-2 rounded-xl text-sm mt-3 hover:bg-white hover:text-primary hover:border hover:border-primary font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account? &nbsp;&nbsp;
          <Link to="/register" className="text-primary underline cursor-pointer">
            Sign up here
          </Link>
        </p>
      </form>
    </div>


  );
};

export default Login;
