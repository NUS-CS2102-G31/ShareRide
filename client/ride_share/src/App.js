import React from 'react';
// import Register from './register/Register';
import logo from './logo.svg';
import './App.css';
import Register from './register/Register';
import Profile from './profile/Profile';
import Profiles from './profile/Profiles'

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Link to="/signup" > Register </Link>
      <Link to="/profile" >Profile</Link>
      <Route path="/signup" component={Register} />
      <Route path="/profile" component={Profiles} />
    </Router>);
}

export default App;
