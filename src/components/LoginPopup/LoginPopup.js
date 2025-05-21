import "./LoginPopup.css";
import { useEffect, useRef } from "react";

function LoginPopup({selfClose}) {

    const inputEmail = useRef();
    const inputPassword = useRef();

    function validateEmail(input) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(input.current.value);

    }

    function beginLoginRoutine() {

        if (validateEmail(inputEmail)) {

            const loginData = {
                email: inputEmail.current.value,
                password: inputPassword.current.value
            }

            console.log(JSON.stringify(loginData));

            fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(response => {
                    console.log(response.json());
                }, error => {
                    console.log(error);
                })

        }

    }

    useEffect(() => {

        const handleKeyUp = (event) => {
            if (event.key === "Escape") {
                selfClose();
            }
        }

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }

    }, []);

    

    return (
        <div className="popup-container">
            <div className="login-popup-title">Log In</div>
            <div className="login-popup-content">
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
            </div>
        </div>
    )

};

export default LoginPopup;