import React from 'react';


function FloppyBird() {
  return (
    <div>
      <style type="text/css">
        {`
          @import url('/floppybird/floppybird.css');
        `}
      </style>
      <iframe
        src="/floppybird/floppybird.html" // Adjust the path if necessary
        width="431"
        height="768"
        title="Floppy Bird Game"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default FloppyBird;
