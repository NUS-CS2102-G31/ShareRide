import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
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
      <Link to="/signup" > Register </Link>
      <Link to="/profile" >Profile</Link>
      <Route path="/signup" component={Register} />
      <Route path="/profile" component={Profiles} />
      
    </Router>
  );
}

export default App;
