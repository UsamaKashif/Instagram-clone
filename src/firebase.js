import firebase from "firebase"

const {REACT_APP_FIREBASE_API_KEY, REACT_APP_APP_ID, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_MEASUREMENT_ID} = process.env

const firebaseApp = firebase.initializeApp({
    // apiKey: REACT_APP_FIREBASE_API_KEY,
    // authDomain: REACT_APP_AUTH_DOMAIN,
    // projectId: REACT_APP_PROJECT_ID,
    // storageBucket: REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    // appId: REACT_APP_APP_ID,
    // measurementId: REACT_APP_MEASUREMENT_ID
    apiKey: "AIzaSyBsZl_A5UW38BUpSPI3Gk_0Q0nt-bM2s9Y",
    authDomain: "instagram-clone-react-bc394.firebaseapp.com",
    projectId: "instagram-clone-react-bc394",
    storageBucket: "instagram-clone-react-bc394.appspot.com",
    messagingSenderId: "755107714442",
    appId: "1:755107714442:web:99f437254f2f58a6906473",
    measurementId: "G-3881S56EEC"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()


export { db, auth, storage}