import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Profiles from './profile/Profiles'
import Navigation from './navbar/navbar';
import DriverForm from './forms/DriverForm'
import CreateRideForm from './forms/CreateRideForm'
import Home from './components/Home';
import SearchRides from './searchRides/SearchRides';
import Signup from './components/Signup';

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="/hello"
            target="_blank"
            rel="noopener noreferrer"
          > }
              Learn React
          </a>

        </header> */}
      </div>
      <Navigation></Navigation>
      {/* <Link to="/signup" > Register </Link>
      <Link to="/profile" >Profile</Link> */}
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Register} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profiles} />
      <Route path="/forms" component={DriverForm} />
      <Route path="/advertiseRide" component={CreateRideForm} />
      <Route path="/searchRides" component={SearchRides} />

    </Router >
  );
}


export default App;
