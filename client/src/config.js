import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = firebase.initializeApp ({
    apiKey: "AIzaSyAq4c01pg50YzQfQAiv0TBPqja9aMUU9V8",
    authDomain: "love-is-sharing.firebaseapp.com",
    projectId: "love-is-sharing",
    storageBucket: "love-is-sharing.appspot.com",
    messagingSenderId: "308244272838",
    appId: "1:308244272838:web:bc4bd54b904a24263da9c7",
    measurementId: "G-58JJWG09RT"
});  

export default firebaseConfig;