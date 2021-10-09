import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import "./tracker.css";
const Tracker = () => {

    const intToString = (num) => {
        if (num < 1000) {
            return num;
        }
        var si = [
            { v: 1E3, s: "K" },
            { v: 1E6, s: "M" },
            { v: 1E9, s: "B" },
            { v: 1E12, s: "T" },
            { v: 1E15, s: "P" },
            { v: 1E18, s: "E" }
        ];
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].v) {
                break;
            }
        }
        return (num / si[i].v).toFixed(0).replace(/\.0+$|(\.[0-9])0+$/, "$1") + si[i].s;
    }

    const [confirm, upconfirm] = useState("");
    const [deaths, updeaths] = useState("");
    const [recoverd, uprecovered] = useState("");
    const [totalcon, uptotalcon] = useState("");
    const [totaldeaths, uptotaldeaths] = useState("");
    const [totalrecover, uptotalrecovered] = useState("");
    const [logged, islooged] = useState("hide");
    const [load, finish] = useState("show");
    const [india, other] = useState('india');
    const [inputsugg, inputsuggend] = useState("hide");
    const [html, sethtml] = useState();
    useEffect(async () => {
        const api = await fetch("https://api.covid19api.com/summary");
        const res = await api.json();
        // upconfirm(`${res.countries[76].NewConfirmed}`);
        upconfirm(intToString(res.Countries[76].NewConfirmed));
        updeaths(intToString(res.Countries[76].NewDeaths));
        uprecovered(intToString(res.Countries[76].NewRecovered));
        uptotalcon(intToString(res.Countries[76].TotalConfirmed));
        uptotaldeaths(intToString(res.Countries[76].TotalDeaths));
        uptotalrecovered(intToString(res.Countries[76].TotalRecovered));

    }, []);
    const [currentimg, updateedimg] = useState("logo/download (1).jpg");
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            islooged("show");
            finish("hideit");
            // ...
        } else {
            // User is signed out
            islooged("hide");
            finish("hideit");
            // ...
        }
    });
    const clickon = (e) => {
        other(e.target.innerHTML);
        sethtml();
        getsubmit(e);
    }
    const getsubmit = async (e) => {
        e.preventDefault();
        const subdata = await fetch("https://api.covid19api.com/summary");
        const resdata = await subdata.json();
        if (resdata) {
            let arry = resdata.Countries.filter(item => {
                const regx = new RegExp(`^${india}`, 'gi');
                return item.Country.match(regx);
            });
            sethtml();
            if(india.length > 0){
            upconfirm(intToString(arry[0].NewConfirmed));
            updeaths(intToString(arry[0].NewDeaths));
            uprecovered(intToString(arry[0].NewRecovered));
            uptotalcon(intToString(arry[0].TotalConfirmed));
            uptotaldeaths(intToString(arry[0].TotalDeaths));
            uptotalrecovered(intToString(arry[0].TotalRecovered));
            }
        }

    }
    const change = async (e) => {
        other(e.target.value);
        const data = await fetch("https://api.covid19api.com/summary");
        const res = await data.json();
        if (res) {
            let arry = res.Countries.filter(item => {
                const regx = new RegExp(`^${e.target.value}`, 'gi');
                return item.Country.match(regx);
            });
            if (arry.length > 0) {
                const Newhtml = arry.map(items => {
                    return <li onClick={clickon}>{items.Country}</li>;
                })
                sethtml(Newhtml);
            }
            if (e.target.value.length === 0) {
                inputsuggend("hide");
                arry = [];
            }
            else {
                inputsuggend('show');
            }
        }
    }
    return (
        <>
            <div className="tracker" id={logged}>
                <h1>Number of covid-19 cases</h1>
                <form className="search" onSubmit={getsubmit}>
                    <input type="text" placeholder="search your country name" value={india} onInput={change} />
                    <div className="sugg" id={inputsugg}>
                        <ul>
                            {html}
                        </ul>
                    </div>
                    <img src="logo/search_black_24dp (3).svg" />
                </form>
                <div className="data">
                    <div>
                        <h4>NewConfirmed</h4>
                        <h5>{confirm}</h5>
                    </div>
                    <div>
                        <h4>NewDeaths</h4>
                        <h5>{deaths}</h5>
                    </div>
                    <div>
                        <h4>NewRecovered</h4>
                        <h5>{recoverd}</h5>
                    </div>
                </div>
                <div className="whole">
                    <div>
                        <h4>TotalConfirmed</h4>
                        <h5>{totalcon}</h5>
                    </div>
                    <div>
                        <h4>TotalDeaths</h4>
                        <h5>{totaldeaths}</h5>
                    </div>
                    <div>
                        <h4>TotalRecovered</h4>
                        <h5>{totalrecover}</h5>
                    </div>
                </div>
                <div className="loader" id={load}>
                    <div></div>
                </div>
            </div>
        </>

    );
}
export default Tracker;