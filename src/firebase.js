import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCWWY-S5L85oblVsoHzn_R6Ev3RkzCQrgM",
  authDomain: "instagram-97a34.firebaseapp.com",
  projectId: "instagram-97a34",
  storageBucket: "instagram-97a34.appspot.com",
  messagingSenderId: "25889209169",
  appId: "1:25889209169:web:f3cc36dab13a994fdab170",
  measurementId: "G-RX9D7R35C5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
