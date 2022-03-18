import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Details from './Components/Details/Details';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;
