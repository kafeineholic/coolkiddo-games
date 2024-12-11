import React from 'react';
import { assets } from '../../assets/assets'; 
import { useNavigate } from 'react-router-dom'; 


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center py-2 px-4 sm:py-3 sm:px-16 absolute top-0 bg-[#40826d] z-10">
      <img
        onClick={() => navigate('/')}
        src={assets.game} 
        alt="Game Logo"
        className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer" 
      />
      <h1 className="text-xl sm:text-2xl text-white font-bold">Whack A Mole</h1>
    </div>
  );
};

function WhackAMole() {
  return (
    
    <div className="relative pt-15">
      <Navbar />
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
       
      }}>
        <iframe
          src="/whackamole/whackamole.html" 
          width="500"
          height="700"
          title="Whack A Mole Game"
          style={{ border: 'none' }}
        />
      </div>
     
    </div>
  );
}

export default WhackAMole;
