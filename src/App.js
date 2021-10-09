import React from 'react';
import Navbar from './Navbar';
import Into from "./Into";
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Footer from './Footer';
import Tracker from './Tracker';


const App = () => {
  return(
  <>
  <Navbar/>
  <Into/>
  <Login/>
  <Tracker/>
  <About/>
  <Contact/>
  <Footer/>
  </>);
}

export default App;
