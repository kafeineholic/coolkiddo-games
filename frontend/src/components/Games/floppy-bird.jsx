import React from 'react';


function FloppyBird() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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