import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,

};
// const firebaseConfigTesting = {
//     apiKey: "AIzaSyD1z0O0m0lB_JOSj54TXhY96wLjgRJotP0",
//     authDomain: "react-journal-test-59e4f.firebaseapp.com",
//     databaseURL: "https://react-journal-test-59e4f-default-rtdb.firebaseio.com",
//     projectId: "react-journal-test-59e4f",
//     storageBucket: "react-journal-test-59e4f.appspot.com",
//     messagingSenderId: "927329275984",
//     appId: "1:927329275984:web:03ebbe9fe4931bcdd88155",
//     measurementId: "G-KSLGBPBWPS"
// };
// let app = null;

// // Initialize Firebase
// if (process.env.NODE_ENV === 'test') {
//     app = initializeApp(firebaseConfigTesting);
// } else {
//     app = initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}