import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import xmax from '../assets/xmas.mp3';  // Ensure this path is correct

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const sound = new Howl({
        src: [xmax],  // Pass the imported file path as an array
        loop: true,
        volume: 0.5
    });

    useEffect(() => {
        // Start playing the music when the user hovers on the page
        const handleMouseEnter = () => {
        
            if (!sound.playing()&& !isPlaying) {  // Only play if it's not already playing
                sound.play();
                sound.mute(false)
                setIsPlaying(true);
                
            }
        
        };

        const handleBeforeUnload = () => {
            sound.stop();
        };
        // Attach the hover event to the document
        document.body.addEventListener('click', handleMouseEnter);
        window.addEventListener('beforeunload', handleBeforeUnload);
        

        // Clean up the event listener when the component unmounts
        return () => {
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isPlaying, sound]);

    return (
        <div className="opacity-0">
        </div>
    );
}

export default BackgroundMusic;
