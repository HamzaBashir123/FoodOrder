import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes
  
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
  
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrcfTMBH__w121aDcW-rWRZQoG-4HN6Zk",
    authDomain: "food-order-d0df7.firebaseapp.com",
    projectId: "food-order-d0df7",
    storageBucket: "food-order-d0df7.appspot.com",
    messagingSenderId: "1015592216713",
    appId: "1:1015592216713:web:44521d82e7b8894e6cbe58"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getAuth,
  createUserWithEmailAndPassword,
  query,
  where,
  getDocs,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
  uploadBytes,
  
  
};
