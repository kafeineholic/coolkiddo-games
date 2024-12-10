import React, { useState, useEffect, useRef } from 'react';

function WhackAMole() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
  
            <iframe
                src="/whackamole/whackamole.html" // Adjust the path if necessary
                width="500"
                height="700"
                title="Tic-Tac-Toe Game"
                style={{ border: 'none' }}
            />
        </div>
    );
  }
  
  export default WhackAMole;