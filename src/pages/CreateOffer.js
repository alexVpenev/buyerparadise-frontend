import {useState, useEffect} from "react";
import axios from "axios";
import authHeader from '../authHeader';
import OfferCard from "../components/OfferCard";
import {Link, Route} from "react-router-dom";
import { createBrowserHistory } from "history";

function CreateOffer(){

    const [offerName, setOfferName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [state, setState] = useState({file: null});

    const [errorMessage, setErrorMessage] = useState("");
    const history = createBrowserHistory();


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

    const createOffer = (name, price, description) => {
        axios
            .post("http://localhost:8080/offer/create", { name, price, description }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Something went wrong");
                } else {

                    uploadFile(res.data);
                    console.log(res.data);
                    history.push("/profile")
                    window.location.reload();
                }
            })
            .catch((error) => {

                if(error.response.status === 403){
                    alert("Re-login");
                }


            })

        

    };

    // const onFileChangeHandler = (e) => {
    //     e.preventDefault();
        
    //     setState({
    //         file: e.target.files[0]
    //     });

    //     const formData = new FormData();
    //     formData.append('file', state.file);
    //     console.log(state.file)

    //     axios
    //         .post('http://localhost:8080/file/upload/photo',  { formData }, {
    //             headers: {
    //               'Content-Type': 'multipart/form-data'
    //             }
    //         })
    //         .then(res => {
    //             if (res.ok) {
    //                 console.log(res.data);
    //                 alert("File uploaded successfully.")
    //             }
    //             console.log(res.data.error);
    //         });
    // };

    const onFileChangeHandler = (e) => {

        e.preventDefault();


        setState({file: e.target.files[0]})

        console.log(state.file)

        

    }

    const uploadFile = (offerID) => {

        const url = 'http://localhost:8080/file/upload/photo';

        const formData = new FormData();
        formData.append('file', state.file);

        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
          axios
          .post(url, formData , { headers: authHeader() })
          .then((response) => {
            console.log(response.data);
          })


    }




    const handleOfferChange = (e) => {
        e.preventDefault();

        setOfferName(e.target.value);
    };
    const handlePriceChange = (e) => {
        e.preventDefault();

        setPrice(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        e.preventDefault();

        setDescription(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!offerName || !price || !description || state.file === null) {
            setErrorMessage("Please fill in all forms");
            return;
        } else {
            createOffer(offerName, price, description);
        }
    };



    return(
        <div class="login-container">

            <h1>Create Offer</h1>

            <div class="aa">
                    <input type="file" placeholder="Profile picture" id="profile-picture" name="profile-picture" accept=".jpg, .jpeg, .png" onChange={onFileChangeHandler} />

                </div>

            <form method="post" id="login-form" onSubmit={handleFormSubmit}>
            <div>
                <p>{errorMessage}</p>
                <div class="textbox">
                    <input type="text" placeholder="Offer Name" id="offerName" name="offerName" onChange={handleOfferChange}/><br />
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Price" id="price" name="price" onChange={handlePriceChange}/><br />
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Description" id="description" name="description" onChange={handleDescriptionChange}/><br />
                </div>
                <input class="btn" type="submit" value="Create" id="btnSubmit" />
            </div>

            </form>



        </div>

    );
}


export default CreateOffer;