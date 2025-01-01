import "./Breadcrumbs.css";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs({ name }) {
    
    const location = useLocation()

    function generateBreadcrumbs(pathname) {

        const rules = {
            "": {
                path: "/",
                name: "Home"
            },
            "all-products": {
                path: "/all-products",
                name: "All Products"
            },
            "abcd": {
                path: null,
                name: name
            }

        }

        let breadcrumbs = [];

        (pathname === "/") ? breadcrumbs.push("") : breadcrumbs = pathname.split("/");        

        const processed_breadcrumbs = breadcrumbs.map((elem, index, array) => {

            if (elem.length === 4) {
                // It is ID
                elem = "abcd";
            }

            const isLast = (index === (array.length - 1)) ? true : false;

            const result = [rules[elem].name, rules[elem].path, isLast];

            return result;

        })

        return processed_breadcrumbs;

    }
    

    return (

        <div className="breadcrumbs">
            {
                generateBreadcrumbs(location.pathname).map((elem, index) => {

                    return (
                        <Link className={(elem[2]) ? "link-disabled" : null} to={elem[1]} key={index}>{elem[0]}</Link>
                    )

                })
            }
        </div>

    )


}

export default Breadcrumbs;