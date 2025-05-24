import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import "./LoginPopup.css";
import { useEffect, useRef, useState } from "react";

function LoginPopup({selfClose}) {

    const [emailError, setEmailError] = useState(null);
    
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

        } else {
            setEmailError("Invalid email");
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

    });

    

    return (
        <div className="popup-container">
            <div className="login-popup-title">Log In</div>
            <div className="login-popup-content">
                <InputText
                    inputType="email"
                    inputLabel="Email"
                    ref={inputEmail}
                    errorText={(emailError) ? emailError : null}/>
                <InputText
                    inputType="password"
                    inputLabel="Password"
                    ref={inputPassword}
                />
                {/* <input type="password" placeholder="password" ref={inputPassword} /> */}
                <a href="./">Forgot password?</a>
                <a href="./">Create account</a>
                <Button type="primary" text="Log In" onClickAction={beginLoginRoutine} passedStyle={{flex: "0 0 auto"}}></Button>
            </div>
        </div>
    )

};

export default LoginPopup;