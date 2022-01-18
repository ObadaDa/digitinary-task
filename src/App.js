import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './views/login';
import Posts from './views/posts';

import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={ <Posts /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </Router>
  );
}

export default App;
