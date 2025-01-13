import "./Gallery.css";
import { useEffect, useState } from "react";

function Gallery({ images }) {

    const [selected_image, selectImage] = useState(0);

    useEffect(() => {
        selectImage(0)
    }, [images]);

    return (

        <div className="gllery-container">

            <div className="gallery-main-image-container">

                <div className="gallery-main-buttons-container">
                    <div className="gallery-button" onClick={() => { if (selected_image > 0) {selectImage(selected_image - 1)}}}></div>
                    <div className="gallery-button" onClick={() => { if (selected_image < 3) {selectImage(selected_image + 1)}}}></div>
                </div>

                <img className="gallery-main-image" src={images[selected_image]} />
            
            </div>
            
            <div className="images-row-container">

                <div className="images-row">

                    {
                        images.map((element, index) => {

                            return <img className={`gallery-small-image ${(images[selected_image] === element) ? "gallery-small-image-selected" : null}`} src={element} key={index} onClick={() => {selectImage(index)}} alt="product image" />

                        })

                    }

                </div>

            </div>

            

        </div>

    )

}

export default Gallery;
