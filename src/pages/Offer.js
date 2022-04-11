import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import authHeader from '../authHeader';
import {Link, Route} from "react-router-dom";
import '../componentsStyle/Offer.css';


function Offer() {

    const[offer, setOffer] = useState({});
    const[pictureOffer, setPictureOffer] = useState();
    let { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/offer/${id}`, { headers: authHeader() })
            .then(res => {
                setOffer(res.data);
            })

    }, [])

    useEffect(() => {
        axios
              .get(`http://localhost:8080/file/offer/${id}`,{responseType: 'blob'}, { headers: authHeader() })
            .then(res => {
                setPictureOffer(URL.createObjectURL(res.data))
            })

    }, [])

    return(
        <div>
            <img className="offer-page-img" src={pictureOffer}/>
            <div className="offer-page-info">
            <h1 >{offer.name}</h1>
            <h1>{offer.price} eur</h1>
            <h1>{offer.description}</h1>
            <Link to={"/seller/" + offer.seller_id} >To Seller's Profile</Link>
            </div>
        </div>
    )
}

export default Offer