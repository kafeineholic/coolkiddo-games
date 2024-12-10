import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUp/SignUp.jsx';
import Profile from './components/Profile/Profile.jsx';


import Preview from './components/Preview/Preview.jsx';
import Footer from './components/Footer/Footer.jsx';

import TrendingGames from './components/TrendingGames/TrendingGames.jsx';
import ColorMemo from './components/TrendingGames/1.jsx';
import TwoZeroFourEightGames from './components/TrendingGames/2.jsx';
import FloppyBird from './components/TrendingGames/3.jsx';
import PacMan from './components/TrendingGames/4.jsx';
import TicTacToe from './components/TrendingGames/5.jsx';
import WhackAMole from './components/TrendingGames/6.jsx';


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };
  
  return (
    
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
        <Route path="/register" element={<Signup />} />
        <Route path="/trending" element={<TrendingGames />} />
        <Route path="/GamesPage/1" element={<ColorMemo />} />
        <Route path="/GamesPage/2" element={<TwoZeroFourEightGames />} />
        <Route path="/GamesPage/3" element={<FloppyBird />} />
        <Route path="/GamesPage/4" element={<PacMan />} />
        <Route path="/GamesPage/5" element={<WhackAMole />} />
        <Route path="/GamesPage/6" element={<TicTacToe />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
