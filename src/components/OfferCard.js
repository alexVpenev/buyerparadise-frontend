import './OfferCard.css'
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from '../authHeader';

function OfferCard(props) {

    const [pictureOffer, setPictureOffer] = useState();

    useEffect(() => {
        axios
              .get(`http://localhost:8080/file/offer/${props.offer.id}`,{responseType: 'blob'}, { headers: authHeader() })
            .then(res => {
                setPictureOffer(URL.createObjectURL(res.data))
            })

    }, [])



    return(
        <Link to={"/offer/" + props.offer.id}>
            <div className="offer-card">

            <img className="offer-image" src={pictureOffer} />


            <h2>{props.offer.name}</h2>
            <h3>{props.offer.price}€</h3>
            <h4>by {props.offer.seller_name}</h4>
            </div>
        </Link>
    )


}

export default OfferCard