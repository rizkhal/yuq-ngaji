import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCi0nko4r4v6ExYdBVlS61NvHJ1PCBWkmk",
  authDomain: "ayu-ngaji.firebaseapp.com",
  projectId: "ayu-ngaji",
  storageBucket: "ayu-ngaji.appspot.com",
  messagingSenderId: "1027699024677",
  appId: "1:1027699024677:web:9ded5bf0934f822103b0cc",
  measurementId: "G-FZPT9NR1FL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();

export { database, auth, storage };
