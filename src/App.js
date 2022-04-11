import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Offer from "./pages/Offer";

import { createBrowserHistory } from "history";
import Register from "./pages/Register";
import BecomeSeller from './pages/BecomeSeller';
import PersonalProfile from './pages/PersonalProfile';
import CreateOffer from './pages/CreateOffer';
import SellerProfile from './pages/SellerProfile';

function App() {

  
  const history = createBrowserHistory();

    const logout = () => {
        localStorage.removeItem('accessToken')
        window.location.reload();history.push("/")
        window.location.reload();

    }



    return (
      <div className="App">
        <Router>
          <Navbar logout={logout} />
            <Switch>
                <Route path='/' exact component={Home} />

                <Route path='/login' exact component={Login} />

                <Route path='/becomeSeller' exact component={BecomeSeller} />

                <Route path='/profile' exact component={PersonalProfile} />

                <Route path='/createOffer' exact component={CreateOffer} />

                <Route exact path ="/register"><Register/></Route>

                <Route path='/offer/:id' exact component={Offer}></Route>

                <Route path='/seller/:id' exact component={SellerProfile}></Route>

            </Switch>
        </Router>
      </div>
  );
}

export default App;
