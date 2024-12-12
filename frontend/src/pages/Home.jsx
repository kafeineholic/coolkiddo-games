import React from 'react'
import Navbar from '../components/Navbar';
import Header from '../components/Header'
import Leaderboard from './Leaderboard';
import webBg from '../assets/webbg.png';
import Snowfall from 'react-snowfall'; // Import the snowfall library

const Home = () => {
  return (
    <div>
      {/* Section 1: Background Image Section */}
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

     
      <section className="leaderboard-section w-full p-8 bg-gray-800 bg-opacity-90 z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Leaderboard</h2>
          <Leaderboard />
        </div>
      </section>
    </div>
  );
}

export default Home;
