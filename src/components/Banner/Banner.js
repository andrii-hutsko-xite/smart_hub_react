import "./Banner.css";
import { useState } from 'react';

// This banner stores an array with all image paths it needs to display
// When a user clicks a circle dot or an arros it should re-render and display another image

function Banner() {

    let banner_images = [
        "./media/banner/banner-01.jpg",
        "./media/banner/banner-02.jpg",
        "./media/banner/banner-03.jpg",
        "./media/banner/banner-04.jpg"
    ];  
    
    const [current_banner, updateBanner] = useState(banner_images[0]);

    return (
        <div className="banner">
            <img className="banner-image" src={current_banner} alt="" />
            <div className="controls">
                {
                    banner_images.map((image, index) => {

                        if (current_banner === banner_images[index]) {
                            return (
                                <div className="dot selected" key={index}></div>
                            )
                        } else {
                            return (
                                <div className="dot" key={index} onClick={() => {
                                    updateBanner(banner_images[index])                                    
                                }}></div>
                            )
                        }
                        
                    })
                }
            </div>
        </div>
    );
    
}

export default Banner;