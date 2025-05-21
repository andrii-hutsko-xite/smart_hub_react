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
    
    const [current_banner, updateBanner] = useState(0);
    const [cursorOverBanner, setCursorOverBanner] = useState(false);

    return (
        <div className="banner">
            <div className="banner-image-container">
                {
                    (cursorOverBanner) ? (
                        <div className="banner-image-buttons-container" onMouseEnter={() => {setCursorOverBanner(true)}}>
                            <div className="banner-button" onClick={() => {
                                if (current_banner > 0) {
                                    const newBannerValue = current_banner - 1;
                                    updateBanner(newBannerValue);
                                }
                            }}></div>
                            <div className="banner-button" onClick={() => {
                                if (current_banner < (banner_images.length - 1)) {
                                    const newBannerValue = current_banner + 1;
                                    updateBanner(newBannerValue);
                                }
                            }}></div>
                        </div>
                     ) : (
                        null
                     )
                }
                <img className="banner-image"
                    src={banner_images[current_banner]}
                    onMouseEnter={() => {setCursorOverBanner(true)}}
                    onMouseLeave={() => {setCursorOverBanner(false)}}
                    alt=""
                />
            </div>
            <div className="controls">
                {
                    banner_images.map((image, index) => {

                        if (current_banner === index) {
                            return (
                                <div className="dot selected" key={index}></div>
                            )
                        } else {
                            return (
                                <div className="dot" key={index} onClick={() => {
                                    updateBanner(index)                                    
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