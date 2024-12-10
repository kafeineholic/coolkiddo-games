import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#804D37] text-[#F5F4ED] p-4 flex items-center justify-between">
            {/* <!-- Column 1 --> */}
            <div className="flex items-center gap-2">
                <p className="font-bold">Follow us on</p>
                <a href="https://facebook.com" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://instagram.com" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://twitter.com" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="https://line.me" aria-label="Line"><i className="fa-brands fa-line"></i></a>
            </div>
            {/* <!-- Column 2 --> */}
            <div className="flex items-center gap-2">
                <p>
                    <i className="fa-regular fa-copyright mr-2"></i>
                    2024 COOLKIDDO. All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
