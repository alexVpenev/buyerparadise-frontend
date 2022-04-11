import OfferCardRow from '../components/OfferCardRow.js'
import {useState} from "react";
import axios from "axios";
import authHeader from '../authHeader';
import { createBrowserHistory } from "history";


function BecomeSeller(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = createBrowserHistory();


    const becomeSeller = (firstName, lastName, phoneNumber) => {
        axios
            .post("http://localhost:8080/account/upgrade", { firstName, lastName, phoneNumber }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Something went wrong");
                } else {
                    localStorage.removeItem('accessToken')
                    history.push("/")
                    window.location.reload();
                }
            })
            .catch((error) => {

                if(error.response.status === 403){
                    alert("Re-login");
                }


            })

    };



    const handleFirstNameChange = (e) => {
        e.preventDefault();

        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        e.preventDefault();

        setLastName(e.target.value);
    };
    const handlePhoneNumberChange = (e) => {
        e.preventDefault();

        setPhoneNumber(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !phoneNumber) {
            setErrorMessage("Please fill in all the required fields.");
            return;
        } else {
            becomeSeller(firstName, lastName, phoneNumber);
        }
    };





    return(


        <form method="post" id="login-form" onSubmit={handleFormSubmit}>
            <div class="login-container">
                <h1>Become Seller</h1>
                <p>{errorMessage}</p>
                <div class="textbox">
                    <input type="text" placeholder="First name" id="First name" name="First name" onChange={handleFirstNameChange}/><br />
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Last name" id="Last name" name="Last name" onChange={handleLastNameChange}/><br />
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Phone number" id="Phone number" name="Phone number" onChange={handlePhoneNumberChange}/><br />
                </div>
                <input class="btn" type="submit" value="Become Seller" id="btnSubmit" />
            </div>
        </form>



    );
}


export default BecomeSeller;