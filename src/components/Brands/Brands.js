import "./Brands.css";
import BrandItem from "../BrandItem/BrandItem";
import { Link } from "react-router-dom";

function Brands() {

    const brand_images = [
        "./media/brands/brands-apple.svg",
        "./media/brands/brands-samsung.svg",
        "./media/brands/brands-google.svg",
        "./media/brands/brands-xiaomi.svg",
        "./media/brands/all-brands.svg"
    ]

    return (

        <section style={{marginTop: "24px"}}>
            <div className="title">
                <h2>Brands</h2>
            </div>
            <div className="content">
                {
                    brand_images.map((element, index, array) => {
                        return (
                            (index === array.length - 1) ? (
                                <Link to={`/all-products`} key={index}>
                                    <BrandItem key={index} img_path={element} />
                                </Link>
                                ) : (
                                <BrandItem key={index} img_path={element} />
                            )
                            
                        )
                    })
                }
            </div>
        </section>

    )

}

export default Brands;