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

            const result = [rules[elem].name, rules[elem].path, isLast];

            return result;

        });

        console.log(processed_breadcrumbs);

        return processed_breadcrumbs;

    }
    
    return (

        <div className="breadcrumbs">
            {
                generateBreadcrumbs(location.pathname).map((elem, index) => {

                    return (
                        <Link className={(elem[2]) ? "link-disabled" : undefined} to={elem[1]} key={index}>{elem[0]}</Link>
                    )

                })
            }
        </div>

    )


}

export default Breadcrumbs;