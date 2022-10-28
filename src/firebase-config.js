// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb3AFYMgdy9W7lXdmYacUF27WXadNLwHM",
  authDomain: "blogproject-9e9a3.firebaseapp.com",
  projectId: "blogproject-9e9a3",
  storageBucket: "blogproject-9e9a3.appspot.com",
  messagingSenderId: "976664386302",
  appId: "1:976664386302:web:efe20789f29884ba1723af",
  measurementId: "G-S97PGTW253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);