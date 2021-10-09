import React,{useState} from "react";
import "./Into.css";
import { getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


const Into = () => {
   const [hideit,showit] = useState("show");
   const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      showit("hidethis");
      // ...
    } else {
      // User is signed out
      // ...
      showit("show");
    }
  });
   return(
    <>
    <div className="landing_page">
    <img src="images/tom-ritson-DBYV_V5spes-unsplash.jpg" alt="land" />
    <h1>COVID-19</h1>
    <p>covid-19 is a pandemic which caused by SARS-CoV-2 virus has created a very misarable situation all over the world and we all have to be together to fight against this.</p>
    <a href="#logindata" id={hideit}><button>Join in</button></a>
    </div>
    </>
   );
}

export default Into;