import React from 'react';


function FloppyBird() {
  return (
    <div>
      
      <iframe
        src="/floppybird/floppybird.html" // Adjust the path if necessary
        width="431"
        height="700"
        title="Floppy Bird Game"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default FloppyBird;
