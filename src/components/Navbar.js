import {Link, Route} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useState, useEffect } from "react";
import authHeader from '../authHeader';
import axios from "axios";
import '../componentsStyle/Navbar.css';

const Navbar = ({logout}) => {

    const [checkIfUserIsUSER, setCheckIfUserIsUSER] = useState(null);


    useEffect(() => {
        axios
            .get(`http://localhost:8080/account/checkRole`, { headers: authHeader() })
            .then(res => {
                    

                    if (res.data.error) {
                        setCheckIfUserIsUSER(false)
                    } else {
                        setCheckIfUserIsUSER(true)
                    }

            })
            .catch((error) => {
                if(error.response.status === 403){

                }
                })
        
    }, [])


    return (
        <nav>
            <div class="logo"><Link to="/">Buyer's Paradise</Link></div>




            <div>
                {localStorage.getItem('accessToken') ?

                    checkIfUserIsUSER ? 
                        <div>
                            <div className="log-button">
                            <Link to="/becomeSeller">Become Seller</Link>
                            </div>
                            <div className="log-button">
                            <Link to="/" onClick={logout}>Logout</Link>
                            </div>
                        </div>
                        
                        :
                        <div>
                            <div className="log-button">
                            <Link to="/profile">Profile</Link>
                            </div>
                            <div className="log-button">
                            <Link to="/" onClick={logout}>Logout</Link>
                            </div>

                        </div>
                    
                

                    :
                    <div className="log-button">
                    <Link to="/login">login</Link>
                    </div>
                }
            </div>


        </nav>
    );
}

export default Navbar;