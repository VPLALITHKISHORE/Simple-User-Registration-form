// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyvGF5-GxeEkJ5f-B8fuRiZ4PZOQ9frGQ",
  authDomain: "application-bd951.firebaseapp.com",
  projectId: "application-bd951",
  storageBucket: "application-bd951.appspot.com",
  messagingSenderId: "381457075287",
  appId: "1:381457075287:web:086ff5cda6e172e2046712",
  measurementId: "G-HLCLLP5EH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Initialize Firebase Authentication

// Export services for use in other files
export { db, storage, auth };
