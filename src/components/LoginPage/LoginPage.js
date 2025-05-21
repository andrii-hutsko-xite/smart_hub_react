import Header from "../Header/Header";
import "./LoginPage.css";
import { useRef } from "react";

function LoginPage() {

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

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <h1>Login Page</h1>
                <div className="inputs">
                    <input type="email" ref={inputEmail} placeholder="Email"></input>
                    <input type="password" ref={inputPassword} placeholder="Password"></input>
                </div>
                <button onClick={() => beginLoginRoutine()}>Login</button>
            </div>
        </div>
    )

}

export default LoginPage;