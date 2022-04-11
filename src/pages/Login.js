import {  Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
import '../componentsStyle/Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const history = createBrowserHistory();


    const login = (username, password) => {
        axios
            .post("http://localhost:8080/login", { username, password })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Invalid credentials");
                } else {
                    console.log(res.data);

                    localStorage.setItem('accessToken', JSON.stringify(res.data));
                    // eslint-disable-next-line no-restricted-globals
                    history.push("/")
                    window.location.reload();
                }
            })
            .catch((error) => {

                if(error.response.status === 403){
                    alert("Invalid credentials");
                }


            })

    };


    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setLoginErrorMessage("Please fill in all the required fields.");
            return;
        } else {
            login(username, password);
        }
    };

    return (
        <form method="post" id="login-form" onSubmit={handleFormSubmit}>
            <div class="login-container">
                <p>{loginErrorMessage}</p>
                <h1>Login</h1>
                <div class="textbox">
                    <input type="text" placeholder="Username" id="username" name="username" onChange={handleUsernameChange} /><br />
                </div>
                <div class="textbox">
                    <input type="password" placeholder="Password" id="password" name="password" onChange={handlePasswordChange}/><br />
                </div>
                <input class="btn" type="submit" value="Sign in" id="btnSubmit" />
                <div class="btn-reg">
                    <p>
                        Don't have an account? <Link to="/register">Click here to register.</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Login;