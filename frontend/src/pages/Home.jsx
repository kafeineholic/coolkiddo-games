import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/Header'

import webBg from '../assets/webbg.png';
import Snowfall from 'react-snowfall'; // Import the snowfall library


const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '
      style={{
        backgroundImage: `url(${webBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        minHeight: '100vh',
      }}
    >
      <Snowfall color="white" snowflakeCount={100} style={{ position: 'absolute', zIndex: 1 }} />
      <Navbar />
      <Header />
    </div>
  )
}

export default Home