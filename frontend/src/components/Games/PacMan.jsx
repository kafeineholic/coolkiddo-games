import React from 'react'

function PacMan() {
  return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%' ,
          backgroundColor: '#0a0743'
      }}>

          <iframe
              src="/pacman/pacman.html" // Adjust the path if necessary
              width="431"
              height="700"
              title="PACMAN Game"
              style={{ border: 'none' }}
          />
      </div>
  );
}

export default PacMan;