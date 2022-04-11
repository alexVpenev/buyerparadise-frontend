import {useState, useEffect} from "react";
import axios from "axios";
import authHeader from '../authHeader';
import OfferCard from "../components/OfferCard";
import Chat from "../components/Chat";
import {Link, Route} from "react-router-dom";
import { createBrowserHistory } from "history";
import {useParams} from "react-router-dom";
import alt from "../alt.png";
import '../componentsStyle/SellerProfile.css';

function SellerProfile(){

    const[sellerInfo, setSellerInfo] = useState({});

    const history = createBrowserHistory();
    let { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:8080/account/getSeller/${id}`, { headers: authHeader() })
        .then(res => {


            if (res.data.error) {
                alert("Something went wrong");
                history.push("/")
                window.location.reload();
            } else {
                setSellerInfo(res.data);
            }

        })
        .catch((error) => {

            
            alert("Something went wrong");
            history.push("/")
            window.location.reload();


        })


    })


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
                
            </div>

            <div className="all-offers-row">
            {sellerInfo.offers && (
                <div className="o-row">
                    {sellerInfo.offers.map((offer, index) => (
                        <div className="personal-row">
                        <OfferCard offer={offer} key={index}></OfferCard>
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

export default SellerProfile;