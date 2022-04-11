import {useState, useEffect} from "react";
import axios from "axios";
import authHeader from '../authHeader';
import OfferCard from "../components/OfferCard";
import {Link, Route} from "react-router-dom";
import { createBrowserHistory } from "history";
import '../componentsStyle/PersonalProfile.css';
import Chat from "../components/Chat";
import alt from "../alt.png";

function PersonalProfile(){

    const[sellerInfo, setSellerInfo] = useState({});

    const history = createBrowserHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/account/personalInfo`, { headers: authHeader() })
            .then(res => {
                setSellerInfo(res.data);
                console.log(res);
            })

    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:8080/account/checkRole`, { headers: authHeader() })
            .then(res => {
                    if(res.data) {
                        history.push("/becomeSeller")
                        window.location.reload();
                    }
            })
            .catch((error) => {
                if(error.response.status === 403){
                }
                })
        
    }, [])

    const deleteOffer = (offerID) => {

        axios
            .post(`http://localhost:8080/offer/delete`, {offerID}, { headers: authHeader() })
            .then(res =>{ 
                    console.log('Delete successful')
                        history.push("/profile")
                        window.location.reload()
            })

    }

    return(
        <div class="personal-profile">


            <div  className="selected-profile-data">
                
                <div className="selected-profile-picture-box">
                    <img src={alt} alt="" />
                </div>


                <div className="selected-profile-detail">

                    <p>Username: {sellerInfo.username}</p>         

                </div>


                <div className="selected-profile-detail">

                    <p>Email: {sellerInfo.email}</p>         

                </div>

                    <div className="selected-profile-detail">

                        <p>Name: {sellerInfo.firstName}   {sellerInfo.lastName}</p>

                    </div>
                    
                    <div className="selected-profile-detail">
                        <p>Phone Number: {sellerInfo.phoneNumber}</p>

                    </div>
                    <div className="selected-profile-detail">
                        <p><Link to="/createOffer">Create Offer</Link></p>
                    </div>
            </div>

            <div className="all-offers-row">
            {sellerInfo.offers && (
                <div className="o-row">
                    {sellerInfo.offers.map((offer, index) => (
                        <div className="personal-row">
                        <OfferCard offer={offer} key={index}></OfferCard>
                        <button className = "beautButton" onClick={() => deleteOffer(offer.id)}>Delete</button>
                        </div>
                    ))}
                    </div>
            )
            }
            </div>

            <div className="chat">

            <Chat></Chat>

            </div>


        </div>

    );
}


export default PersonalProfile;