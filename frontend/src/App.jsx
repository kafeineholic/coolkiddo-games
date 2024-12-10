import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUp/SignUp.jsx';
import Profile from './components/Profile/Profile.jsx';


import Preview from './components/Preview/Preview.jsx';
import Footer from './components/Footer/Footer.jsx';

import TrendingGames from './components/TrendingGames/TrendingGames.jsx';
import twozerofoureight from './components/GamesPage/twozerofoureightgames.jsx';
import floppybird from './components/GamesPage/floppybird.jsx';
import pacman from './components/GamesPage/pacman.jsx';
import tictactoe from './components/GamesPage/tictactoe.jsx';
import whackamole from './components/GamesPage/whackamole.jsx';


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
        <Route path="/GamesPage/1" element={<twozerofoureight />} />
        <Route path="/GamesPage/2" element={<floppybird />} />
        <Route path="/GamesPage/3" element={<pacman />} />
        <Route path="/GamesPage/4" element={<tictactoe />} />
        <Route path="/GamesPage/5" element={<whackamole />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
