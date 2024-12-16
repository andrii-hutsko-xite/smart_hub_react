import "./BrandItem.css";

function BrandItem({ img_path }) {

    const styles = {
        backgroundImage: `url(${img_path})`
    }

    return (

        <div className="brand_item" style={styles}>

        </div>

    )


}

export default BrandItem;