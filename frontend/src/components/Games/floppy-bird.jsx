import React from 'react';


function FloppyBird() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%' ,
            backgroundImage: `url('https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png')`, // Replace with your image URL
            backgroundSize: '800px 654px', 
            backgroundRepeat: 'repeat-x', 
            backgroundPosition: 'left top', 
        }}>

            <iframe
                src="/floppy-bird/floppybird.html" // Adjust the path if necessary
                width="431"
                height="700"
                title="Floppy Bird Game"
                style={{ border: 'none' }}
            />
        </div>
    );
}

export default FloppyBird;