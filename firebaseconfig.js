import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDtd1mscSEASGcrxMkw5FhUhfEU4aOfKMA",
    authDomain: "restaurantapp-dc52f.firebaseapp.com",
    projectId: "restaurantapp-dc52f",
    storageBucket: "restaurantapp-dc52f.firebasestorage.app",
    messagingSenderId: "767732177892",
    appId: "1:767732177892:web:aa423590280198806bc5f1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { app, firestore };
