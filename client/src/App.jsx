import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TwoStepAuth from "./pages/TwoStepAuth";

const App = () => {
  return (
    <Routes>
     <Route path="/" element={<TwoStepAuth />} />
    <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    
    </Routes>
  );
};

export default App;
