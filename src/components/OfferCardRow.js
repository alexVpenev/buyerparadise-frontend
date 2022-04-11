import {useEffect, useState} from "react";
import axios from "axios";
import OfferCard from "./OfferCard";
import authHeader from '../authHeader';
import '../componentsStyle/OfferCardRow.css';


function OfferCardRow() {

    const[offers, setOffers] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredOffers, setFilteredOffers] = useState();
    const[order, setOrder] = useState("Oldest first");

    const getData = async () => {

        const res = await axios.get("http://localhost:8080/offer", {headers: authHeader() })
        .then((res) => {
            if(res.data.error) {
                console.log(res.data);
                alert("Someting went worng");
            } else {
                setOffers(res.data);
            }
        }

        )

    }

    useEffect(() => {
        getData();
    }, []);


    const handleSearchChange = (e) => {
        e.preventDefault();
    
            
        setSearch(e.target.value);
    };



    useEffect(() => {
        setFilteredOffers([]);
    
        {offers && (
            offers.map((offer, index) => (
                    
                        offer.name.includes(search) ? 
    
                        setFilteredOffers(filteredOffers => [...filteredOffers, offer]) 
                        : 
                        null

                    )
                )
    
                
            )
        }
            
            
    }, [search]);

    const reverseList = () => {
        if(order === "Oldest first") {
            setOrder("Most Recent");
        }else {
            setOrder("Oldest first");
        }
    }



    return (

        <div className="main">

            <input className='search-bar-box' onChange={handleSearchChange} type="text" placeholder="Search" id="search" name="search" />
            <button className = "beautButton" onClick={() => reverseList()}>Sort By: {order}</button>

            <div>

            {search === "" ? 
            
            order === "Oldest first" ? 
            offers && (
                <div className="s-row">
                    {offers.map((offer, index) => (
                        <div className="individualCard">
                        <OfferCard offer={offer} key={index}></OfferCard>
                        </div>
                    ))}
                </div>

            )

            : 

            offers && (
                <div className="s-row">
                    {offers.slice(0).reverse().map((offer, index) => (
                        <div className="individualCard">
                        <OfferCard offer={offer} key={index}></OfferCard>
                        </div>
                    ))}
                </div>

            )

            :
            
            filteredOffers && (
                <div className="charity-row">
                    {filteredOffers.map((offer, index) => (
                        <div className="individualCard">
                        <OfferCard offer={offer} key={index}></OfferCard>
                        </div>
                    ))}
                </div>
            )
            
            }

            </div>

        </div>

    )

}

export default OfferCardRow;