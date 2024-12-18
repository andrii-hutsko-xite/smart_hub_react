import "./Breadcrumbs.css";
import { useLocation } from "react-router-dom";

function Breadcrumbs() {
    
    const location = useLocation()

    return (

        <div className="breadcrumbs">
            {location.pathname}
        </div>

    )


}

export default Breadcrumbs;