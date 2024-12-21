import "./Brands.css";
import BrandItem from "../BrandItem/BrandItem";

function Brands() {

    const brand_images = [
        "./media/brands/brands-apple.svg",
        "./media/brands/brands-samsung.svg",
        "./media/brands/brands-google.svg",
        "./media/brands/brands-xiaomi.svg"
    ]

    return (

        <section style={{marginTop: "24px"}}>
            <div className="title">
                <h2>Brands</h2>
            </div>
            <div className="content">
                {
                    brand_images.map((element, index) => {
                        return (
                            <BrandItem key={index} img_path={element} />
                        )
                    })
                }
                <BrandItem />
            </div>
        </section>

    )

}

export default Brands;