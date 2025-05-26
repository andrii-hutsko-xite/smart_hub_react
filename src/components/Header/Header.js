import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupAccount from "../PopupAccount/PopupAccount";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";

function Header() {

    const [header_detached, setHeader] = useState(false);
    const [isLoginDisplayed, setLoginDisplayed] = useState(false);
    const [isAccountDisplayed, setAccountDisplayed] = useState(false);
    const [isUserLogged, setUserLogged] = useState(((localStorage.getItem('authToken') !== null) ? true : false));
    const [userCart, setUserCart] = useState(0);

    const inputSearch = useRef();
    

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

    function toggleAccount() {
        setAccountDisplayed(!isAccountDisplayed);
    }

    useEffect(() => {

        if (isUserLogged) {

            const url = 'http://localhost:3001/get-user-cart';

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserCart(data.count);
                })

        }

    }, [isUserLogged]);
    

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
                        <InputText
                            inputPlaceholder="Search"
                            inputType="text"
                            ref={inputSearch}
                        />
                        {
                            isUserLogged ? (
                                <>
                                    <Link
                                        to='/shopping-cart'
                                    >
                                        <Button
                                            type="secondary"
                                            text={userCart}
                                            iconLeft={"shopping"}
                                        />
                                    </Link>
                                    <Button
                                        type="secondary"
                                        text="0"
                                        iconLeft={"favorite"}
                                    />
                                    <Button
                                        type="secondary"
                                        text="Andrii"
                                        onClickAction={() => toggleAccount()}
                                        buttonClass="account-button"
                                        iconLeft={"user"}
                                    />
                                </>
                            ) : (
                                <Button
                                    buttonClass="login-button"
                                    type="secondary"
                                    text="Log In"
                                    onClickAction={() => {toggleLogin()}}
                                    iconLeft={"user"}
                                />
                            )
                        }
                        {/* <button className="login-button" onClick={() => {toggleLogin()}}>Log in</button> */}
                        {(isLoginDisplayed) ? (<PopupLogin selfClose={() => {setLoginDisplayed(false)}}></PopupLogin>) : null}
                        {(isAccountDisplayed) ? (<PopupAccount selfClose={() => {setAccountDisplayed(false)}}></PopupAccount>) : null}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;