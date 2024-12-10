import React from "react";
import CoverImg from "../assets/imgpreview/preview_cover.jpg";
import HeroPng from "../assets/imgpreview/preview_png.png";
import { useNavigate } from "react-router-dom";

const bgImage = {
    backgroundImage: `url(${CoverImg})`,
    backgroundSize: "cover", // Fixed typo
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
};

const Preview = () => {
    const navigate = useNavigate();
    // const [isLoggedIn, setIsLoggedIn] = useState(false); 

    // const handleLogin = () => {
    //     setIsLoggedIn(true);
    // };

    // const handleExplore = () => {
    //     if (isLoggedIn) {
    //         navigate("/trending");
    //     } else {
    //         navigate("/login");
    //         alert("Please log in to explore trending games.");
    //     }
    // }; 
    return (
        <>
            {/* Background Section */}
            <div style={bgImage} className="min-h-[550px] w-full overflow-hidden">
                <div className="bg-[#3A8232]/80 bg-gradient-to-t from-primary from-10% to-transparent to-90% flex items-center h-full w-full min-h-[550px]">
                    <div className="container">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                            {/* Content Section */}
                            <div>
                                <p className="text-lg text-[#E22413] font-semibold">
                                    Discover Games You Will Love
                                </p>
                                <h1 className="text-5xl text-[#F5F4ED] font-bold">
                                    Read About Games That You Enjoy
                                </h1>
                                <button className="mt-8 bg-gradient-to-r from-[#E22413] to-[#7A1008] inline-block px-6 py-3 rounded-2xl text-[#F5F4ED] font-semibold"
                                    onClick={() => navigate("/trending")}>
                                    Start Exploring
                                </button>
                            </div>
                            {/* Image Section */}
                            <div>
                                <img src={HeroPng} alt="Game preview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Preview;
