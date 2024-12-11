import React from 'react';
import { assets } from '../../assets/assets';

function FloppyBird() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%' ,
            backgroundImage: `url(${assets.floppybird_bg})`, // Replace with your image URL
            backgroundSize: 'auto auto', 
            backgroundRepeat: 'repeat-x', 
           
            backgroundColor: '#000000'
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