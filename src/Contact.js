import React, { useState } from 'react'
import "./contact.css";

export default function Contact() {
    const [currentData, Updatedata] = useState({
        name: "",
        message: "",
    });
    const getData = (event) => {
        const { name, value } = event.target;
        Updatedata({
            ...currentData, [name]: value
        })
    }
    const postData = (event) => {
        event.preventDefault();
        const { name, message } = currentData;
        if(name === "" || message === ""){
            alert("please enter something");
        }
        else{
        const res = fetch("https://covid-19-7243d-default-rtdb.firebaseio.com/userdata.json", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(currentData)
        });
        if (res) {
            alert("thank you for your feedback");
            Updatedata({
                name: "",
                message: ""
            })
        }
        else {
            alert("please fill up the data");
        }
    }
    }
    return (
        <>
            <div className="contact">
                <div className="form">
                    <h1>help desk</h1>
                    <form method="POST" id="formid">
                        <input type="text" name="name" value={currentData.name} placeholder="type your name here" autoComplete="off" onChange={getData} />
                        <textarea id="query" form="formid" name="message" value={currentData.message} placeholder="type your question here" autoComplete="off" rows="6" cols="40" onChange={getData}></textarea>
                        <input type="submit" name="submit" value="submit" onClick={postData} />
                    </form>
                </div>
                <img src="images/2451377.jpg" alt="contact-us" />
            </div>
        </>
    )
}
