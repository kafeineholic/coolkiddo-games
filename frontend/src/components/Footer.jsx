import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import footerBg from '../assets/footerbg.png';


const Footer = () => {
    return (
        <footer
            className="relative text-white pt-20 -mt-40 "
            style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                zIndex: 10, // ทำให้ฟุตเตอร์อยู่เหนือเนื้อหาอื่น ๆ
                paddingBottom: '60px', // ปรับเพิ่มขนาด padding ด้านล่างหากต้องการให้ภาพเห็นทั้งหมด
            }}
        >
            {/* Footer Content */}
            <div className="gap-10 py-20   text-[#366a56] text-center">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>

            </div>
            {/* Footer Bottom */}
            <div className="text-[#366a56] text-center py-4">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;
