import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import "./PopupLogin.css";
import { useEffect, useRef, useState } from "react";

function PopupLogin({ selfClose }) {

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
            };

            fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                // First, check if the response itself was successful (e.g., status 200-299)
                if (!response.ok) {
                    // If not successful, parse the error response and throw an error
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Login failed');
                    });
                }
                // If successful, parse the JSON body
                return response.json();
            })
            .then(data => { // This 'data' is now the actual parsed JSON object
                const token = data.token; // Access the 'token' property
                localStorage.setItem('authToken', token);
                window.location.reload();
                // You might want to redirect the user here
            })
            .catch(error => { // Catch any errors from fetch or the .then() chain
                console.error('Login error:', error.message);
                setEmailError(error.message); // Display error to user
            });

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

    // localStorage.removeItem("authToken");
    

    return (
        <div className="popup-container-login">
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

export default PopupLogin;