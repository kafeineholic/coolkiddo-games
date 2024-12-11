import React from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom'; 

// Navbar component
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center py-2 px-4 sm:py-3 sm:px-16 absolute top-0 bg-[#40826d] bg-opacity-75 z-10">
      <img
        onClick={() => navigate('/')}
        src={assets.game} 
        alt="Game Logo"
        className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer" 
      />
      <h1 className="text-xl sm:text-2xl text-white font-bold">Floppy Bird</h1>
    </div>
  );
};

function FloppyBird() {
  return (
    <div className="relative">
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundImage: `url(${assets.floppybird_bg})`,
        backgroundSize: 'auto auto',
        backgroundRepeat: 'repeat-x',
        backgroundColor: '#000000',
      }}>
        <iframe
          src="/floppy-bird/floppybird.html" 
          width="431"
          height="700"
          title="Floppy Bird Game"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}

export default FloppyBird;
