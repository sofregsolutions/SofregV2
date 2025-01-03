import React, { useState, useEffect } from "react";
import './App.css'
import Home from './app/pages/Home'
import Services from './app/pages/Service';
import About from './app/pages/About';
import Pricing from './app/pages/Pricing';
import Contact from './app/pages/Contact';
import Career from './app/pages/Career';
import Loader from "./app/components/Loader";
import {BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./app/pages/NotFound";
function App() {
  // const location = useLocation();
  // useEffect(() => {
  //   // Check if the pathname is the root ('/') or any other specific page
  //   if (location.pathname === "/") {
  //     console.log("On homepage, refreshing...");
  //     // Reload the page
  //     window.location.reload();
  //   }
  // }, [location.pathname]); // Only run when pathname changes

  if (process.env.NODE_ENV === 'development') {
    // console.log = () => {}; // Disable console.log
    // console.warn = () => {}; // Disable console.warn
    // console.error = () => {}; // Disable console.error
  }
  

  
  return (
    <>
    <BrowserRouter>
      {/* {isLoading && <Loader />}  */}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/career' element={<Career />} />
      </Routes>
      
    </BrowserRouter>

    </>
  )
}

export default App
