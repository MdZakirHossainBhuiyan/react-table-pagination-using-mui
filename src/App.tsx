import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/details' component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
