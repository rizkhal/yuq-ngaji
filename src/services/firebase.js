import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
var firebaseConfig = {
  apiKey: "AIzaSyA4IITJ1-tKZB-9nrEsE6ACTZy_8ISyp40",
  authDomain: "ayo-tobat.firebaseapp.com",
  projectId: "ayo-tobat",
  storageBucket: "ayo-tobat.appspot.com",
  messagingSenderId: "763107903584",
  appId: "1:763107903584:web:5c620791f5e5c3658a5b05",
  measurementId: "G-PZ98BS9Y65",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
