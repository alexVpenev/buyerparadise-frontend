import { Link } from "react-router-dom";
import { useState } from 'react';
import { createBrowserHistory } from "history";
import axios from "axios";
import '../componentsStyle/Login.css';


const Register = ({}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = createBrowserHistory();

    const [errorMessage, setErrorMessage] = useState("");


    const register = () => {
        axios
            .post("http://localhost:8080/account/register", {
                username,
                email,
                password,
            })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data);
                }else {
                    alert("Account Creation Successful!! WELCOME")
                    history.push("/");
                    window.location.reload();
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    console.log(error.res);
                    alert(error.res.data);
                } else {
                    setErrorMessage("User with that username already exists!")
                }
            });
    };

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        e.preventDefault();

        setConfirmPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        e.preventDefault();

        setEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        let checks = true;

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            checks = false;

        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            checks = false;
        }

        if (!password || !email || !username) {
            setErrorMessage("Please fill in all the required fields.");
            checks = false;
        }


        if(checks) {
            setErrorMessage("");
            register();
        }
    };
    return (
        <form method="post" id="login-form" onSubmit={handleSubmit}>
            <div class="login-container">
                <p>{errorMessage}</p>
                <h1>Register</h1>
                <div class="reg-container-1">
                    <div className="textbox">
                        <input type="text" placeholder="Username" id="username" name="username" onChange={handleUsernameChange}/><br/>
                    </div>
                    <div class="textbox">
                        <input type="text" placeholder="E-mail address" id="email" name="email" onChange={handleEmailChange} /><br />
                    </div>
                    <div class="textbox">
                        <input type="password" placeholder="Password" id="password" name="password" onChange={handlePasswordChange} /><br />
                    </div>
                    <div class="textbox">
                        <input type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password" onChange={handleConfirmPasswordChange} /><br />
                    </div>
                </div>
                <input class="btn" type="submit" value="Confirm" id="btnSubmit" onClick={handleSubmit}/>
                <div class="btn-reg">
                    <p>
                        Already have an account? <Link to="/login">Click here to log in.<br /><br /></Link>
                    </p>
                </div>
            </div>
        </form >
    );
}

export default Register;