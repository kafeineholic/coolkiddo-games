import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import footerBg from '../assets/footerbg.png';


const Footer = () => {
    return (
        <footer
            className="relative text-white bg-transparent pt-20"
            style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Footer Content */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 p-10 bg-opacity-70 bg-white ">
                {/* Your sections */}
            </div>
            {/* Footer Bottom */}
            <div className="text-[#366a56] text-center py-4">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;
