import "./Header.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup";
import Button from "../Button/Button";

function Header() {

    const [header_detached, setHeader] = useState(false);
    const [isLoginDisplayed, setLoginDisplayed] = useState(false);
    const [isUserLogged, setUserLogged] = useState(false);
    

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

    }, []);

    function toggleLogin() {
        setLoginDisplayed(!isLoginDisplayed);
    }

    return (
        <header className={header_detached ? "ontop" : "embeded"}>
            <div className="content">
                <div className="links">
                    <a href="./">Delivery & Payment</a>
                    <a href="./">Help</a>
                    <a href="./">FAQ</a>
                </div>
                <div className="main">
                    <Link to="/">
                        <img src='/media/logo.svg' alt='logo'/>
                    </Link>
                    <div className="controls">
                        <input type="text" placeholder="Search" />
                        {
                            isUserLogged ? (
                                <>
                                    <Button type="secondary" text="0"/>
                                    <Button type="secondary" text="0"/>
                                    <Button type="secondary" text="Andrii"/>
                                </>
                            ) : (
                                <Button buttonClass="login-button" type="secondary" text="Log In" onClickAction={() => {toggleLogin()}}/>
                            )
                        }
                        {/* <button className="login-button" onClick={() => {toggleLogin()}}>Log in</button> */}
                        {(isLoginDisplayed) ? (<LoginPopup selfClose={() => {setLoginDisplayed(false)}}></LoginPopup>) : null}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;