import React, { useState } from "react";
import "./navbar.css";
import { getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";



const Navbar = () => {
  const [currentimg, updateedimg] = useState("logo/download (1).jpg");
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      updateedimg(`${user.photoURL}`);
      // ...
    } else {
      // User is signed out
      // ...
      updateedimg("logo/download (1).jpg");
    }
  });

  const signup = () => {
   const noyes = window.confirm("are you sure to log out ?");
   if(noyes){
    signOut(auth).then(() => {
     alert('log out successfully');
    }).catch((error) => {
      alert("something went wrong");
    });
   }
  }
  return (
    <>
      <div className="navbar">
        <div className="title"><a href="/"><span>COVID-19</span> TRACKER</a></div>
        <div className="profile">
          <img src={currentimg} alt="profile"v onClick={signup} />
        </div>
      </div>
    </>
  );
}


export default Navbar;