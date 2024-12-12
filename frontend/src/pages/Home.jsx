import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Leaderboard from './Leaderboard';
import webBg from '../assets/webbg.png';
import Snowfall from 'react-snowfall'; // Import the snowfall library

const Home = () => {
  return (
    <div>
     
      <div
        className='flex flex-col items-center justify-center min-h-screen'
        style={{
          backgroundImage: `url(${webBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          minHeight: '100vh',
        }}
      >
       
        <Snowfall color="white" snowflakeCount={100} style={{ position: 'absolute', zIndex: 1 }} />
        
        <Navbar />
        <Header />
      </div>

    
      <section className="leaderboard-section w-full p-8 bg-blue-100 bg-opacity-80 z-10 relative">
        
        <Snowfall color="white" snowflakeCount={100} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Leaderboard />
        </div>
      </section>
    </div>
  );
};

export default Home;
