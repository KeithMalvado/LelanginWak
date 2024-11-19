import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXAaPMjmyNSVO06G-scb8V88Mhiu_Jwpo",
  authDomain: "lelangin-e4ceb.firebaseapp.com",
  projectId: "lelangin-e4ceb",
  storageBucket: "lelangin-e4ceb.firebasestorage.app",
  messagingSenderId: "2184481177",
  appId: "1:2184481177:web:b8a6e3a46e8255d2ecab08"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
