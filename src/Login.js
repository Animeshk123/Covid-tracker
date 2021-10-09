import React, { useState } from 'react';
import "./login.css";
import Fire from './Fire';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function Login() {
    const [show, hide] = useState("show");
    const [load, finish] = useState("show");
    const [now, then] = useState({
        username: "",
        email: "",
    });
    const googlesignup = (e) => {
        e.preventDefault();
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    console.log(error);
                    // ...
                });
            }catch(error){
                console.log(error);
            }

        }
        try{
    const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                hide("hide")
                finish("hideit");
                // ...
            } else {
                // User is signed out
                hide("show");
                finish("hideit");
                // ...
            }
        });
    }catch(error){
        console.log(error);
    }
    const datageton = (e) => {
        const { name, value } = e.target;
        then({
            ...now, [name]: value
        })
    }
    const submitdata = (e) => {
        e.preventDefault();
        const { username, email } = now;
        if (username === "" || email === "") {
            alert("please enter something");
        }
        else {
            const res = fetch("https://covid-19-7243d-default-rtdb.firebaseio.com/userlogin.json", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(now)
            });
            if (res) {
                alert("please now login with google");
                then({
                    username: "",
                    email: ""
                });

            }
            else {
                alert("please fill up the data");
            }
        }

    }
    return (
        <>
            <div className="login" id={show}>
                <img src="images/register.jpg" alt="sign up now" />
                <div className="formdata" id="logindata">
                    <h2>sign up here</h2>
                    <form method="POST">
                        <input type="text" name="username" placeholder="enter your name" autoComplete="off" onChange={datageton} value={now.username} />
                        <input type="email" name="email" placeholder="enter your email" autoComplete="off" onChange={datageton} value={now.email} />
                        <input type="submit" name="submit" value="sign up" onClick={submitdata} />
                        <h3>or</h3>
                        <button onClick={googlesignup}><img src="logo/1298745_google_brand_branding_logo_network_icon.png" alt="google" />sign in with google</button>

                    </form>
                </div>
                <div className="loader" id={load}>
                    <div></div>
                </div>
            </div>
        </>
    );
}
