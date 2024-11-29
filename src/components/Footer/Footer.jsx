import React from 'react'

const Footer = () => {
    return (
        <div class="bg-[#804D37] text-[#F5F4ED] p-4 flex items-center justify-between ">
            {/* <!--column 1--> */}
            <div class="flex items-center gap-2">
                <p class="font-bold">Follow us on</p>
                <a href=""><i class="fa-brands fa-facebook"></i></a>
                <a href=""><i class="fa-brands fa-instagram"></i></a>
                <a href=""><i class="fa-brands fa-x-twitter"></i></a>
                <a href=""><i class="fa-brands fa-line"></i></a>
            </div>
            {/* <!--column 2--> */}
            <div class="flex items-center gap-2">
                <p><i class="fa-regular fa-copyright mr-2"></i>2024 COOLKIDDO. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;