import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAYgkv1EkY5uNmeeMr5vgWaSZuSB7XazRk",
  authDomain: "listamercado-3f938.firebaseapp.com",
  projectId: "listamercado-3f938",
  storageBucket: "listamercado-3f938.appspot.com",
  messagingSenderId: "1059114440601",
  appId: "1:1059114440601:web:ef45a206b6eca2210be508",
  measurementId: "G-E5YC0L60QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)



// Initialize Firebase
export { app, db, analytics }