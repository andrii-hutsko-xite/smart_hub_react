import { Key } from "react";
import "./Breadcrumbs.css";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs({ name } : {name?: string}) {
    
    const location = useLocation();

    function generateBreadcrumbs(pathname: string) {

        interface RuleEntry {
            path: string;
            name: string;
        }
        
        interface RulesDictionary {
            [key: string]: RuleEntry;
        }

        const rules: RulesDictionary = {
            "": {
                path: "/",
                name: "Home"
            },
            "all-products": {
                path: "/all-products",
                name: "All Products"
            },
            "abcd": {
                path: "",
                name: name ?? ""
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

            const result = {
                name: rules[elem].name,
                path: rules[elem].path,
                isLast: isLast
            }

            return result;

        });

        return processed_breadcrumbs;

    }
    
    return (

        <div className="breadcrumbs">
            {
                generateBreadcrumbs(location.pathname).map((elem, index) => {

                    return (
                        <Link className={(elem.isLast) ? "link-disabled" : undefined} to={elem.path} key={index}>{elem.name}</Link>
                    )

                })
            }
        </div>

    )


}

export default Breadcrumbs;