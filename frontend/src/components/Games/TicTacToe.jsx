import React from 'react'

function TicTacToe() {
  return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
      }}>

          <iframe
              src="/tic-tac-toe/tictactoe.html" // Adjust the path if necessary
              width="100%"
              height="768px"
              title="Tic-Tac-Toe Game"
              style={{ border: 'none' }}
          />
      </div>
  );
}

export default TicTacToe;