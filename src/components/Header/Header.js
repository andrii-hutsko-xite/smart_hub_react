import "./Header.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {

    const [header_detached, setHeader] = useState(false);

    useEffect(() => {
        function checkForHeader() {

            const scroll_y = window.scrollY;
            
            if (scroll_y < 80) {
                setHeader(false);
            } else if (scroll_y >= 80) {
                setHeader(true);
            }

        }

        window.addEventListener("scroll", checkForHeader);

        return () => {
            window.removeEventListener("scroll", checkForHeader)
        }

    }, [])

    return (
        <header className={header_detached ? "ontop" : "embeded"}>
            <div className="content">
                <div className="links">
                    <Link to="/delivery-and-payment">Delivery & Payment</Link>
                    <Link to="/help">Help</Link>
                    <Link to="/questions">FAQ</Link>
                </div>
                <div className="main">
                    <Link to="/">
                        <img src='/media/logo.svg' alt='logo'/>
                    </Link>
                    <div className="controls">
                        <input type="text" placeholder="Search" />
                        <button>Log in</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;