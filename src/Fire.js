import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDylCVng8lvJS8FDf96iEjMHzGph7YmJTs",
    authDomain: "covid-19-7243d.firebaseapp.com",
    databaseURL: "https://covid-19-7243d-default-rtdb.firebaseio.com",
    projectId: "covid-19-7243d",
    storageBucket: "covid-19-7243d.appspot.com",
    messagingSenderId: "11666204858",
    appId: "1:11666204858:web:6d33e09638c3ec59c4fa83"
};

const Fire = initializeApp(firebaseConfig);

export default Fire;