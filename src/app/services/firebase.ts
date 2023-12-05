import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
        apiKey: "AIzaSyCHiGR0MGOAWft4H0sF-rdnInepfyEDz9o",
        authDomain: "agenda-30e56.firebaseapp.com",
        projectId: "agenda-30e56",
        storageBucket: "agenda-30e56.appspot.com",
        messagingSenderId: "342319486112",
        appId: "1:342319486112:web:6a1d1811f0a11ce7ca25c5"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
} else{
    firebase.app();
}

const database = firebase.database();

export {database, firebase}
