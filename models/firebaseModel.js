import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyARQrBTmekSsmXuoo-evcEoTUbeaR7yM5o",
    authDomain: "rogue-lite.firebaseapp.com",
    databaseURL: "https://rogue-lite-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rogue-lite",
    storageBucket: "rogue-lite.appspot.com",
    messagingSenderId: "1091853759584",
    appId: "1:1091853759584:web:6f811c7407ed000acd7f05",
    measurementId: "G-8D2P7DBQHP"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);