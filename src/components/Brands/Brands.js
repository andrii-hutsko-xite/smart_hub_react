import "./Brands.css";
import BrandItem from "../BrandItem/BrandItem";
import { Link } from "react-router-dom";

function Brands() {

    // const brand_images = [
    //     "./media/brands/brands-apple.svg",
    //     "./media/brands/brands-samsung.svg",
    //     "./media/brands/brands-google.svg",
    //     "./media/brands/brands-xiaomi.svg",
    //     "./media/brands/all-brands.svg"
    // ];

    const brandData = {
        // the current object defines which brand cards will be displayed in Brands component – it also defines imges and filtering keys
        apple: {
            image: "./media/brands/brands-apple.svg",
            filterKey: "Apple"
        },
        samsung: {
            image: "./media/brands/brands-samsung.svg",
            filterKey: "Samsung"
        },
        google: {
            image: "./media/brands/brands-google.svg",
            filterKey: "Google"
        },
        xiaomi: {
            image: "./media/brands/brands-xiaomi.svg",
            filterKey: "Xiaomi"
        },
        all: {
            image: "./media/brands/all-brands.svg",
            filterKey: null
        }
    }

    console.log(Object.keys(brandData));

    return (

        <section style={{marginTop: "24px"}}>
            <div className="title">
                <h2>Brands</h2>
            </div>
            <div className="content">
                {
                    
                    Object.keys(brandData).map((brand) => {

                        const {image, filterKey} = brandData[brand];

                        return (
                            <Link
                                // 'to' prop should send just brand to the destination
                                to={`/all-products` + (filterKey ? `?brand=${filterKey}` : "")}
                                key={filterKey}
                                >
                                <BrandItem key={filterKey} img_path={image} />
                            </Link>
                        )
                        
                    })

                }
            </div>
        </section>

    )

}

export default Brands;