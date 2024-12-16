import "./Brands.css";
import BrandItem from "../BrandItem/BrandItem";

function Brands() {

    const brand_images = [
        "./media/brands/brands-apple.png",
        "./media/brands/brands-samsung.png",
        "./media/brands/brands-google.png",
        "./media/brands/brands-xiaomi.png"
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