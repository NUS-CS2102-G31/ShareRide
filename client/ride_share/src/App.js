import React from 'react';
// import Register from './register/Register';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      <Link to="/signup">Register</Link>

     
      <Route path="/signup" component={Register} />

      
    </Router>
  );
}

export default App;
