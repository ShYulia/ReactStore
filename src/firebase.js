
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyB54UcEqCvHYt-asDNlET1LKCvuPYwvCf4",
  authDomain: "react-finalp.firebaseapp.com",
  projectId: "react-finalp",
  storageBucket: "react-finalp.appspot.com",
  messagingSenderId: "220020081178",
  appId: "1:220020081178:web:fa30ca1b9f53e26a4287a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;