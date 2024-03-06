import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD8eTyxD_Gj9IIXWpweBIR6BQ-vF20DLEI",
  authDomain: "hotels-9ad0d.firebaseapp.com",
  databaseURL: "https://hotels-9ad0d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hotels-9ad0d",
  storageBucket: "hotels-9ad0d.appspot.com",
  messagingSenderId: "766917402358",
  appId: "1:766917402358:web:247d768c40b822b5a756d7",
  measurementId: "G-GSW3YWW3GD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

/*
export function connectFirebase() {
  
    // const db = database;
  
    db.on("error", (err) => {
      console.log(`database connection error: ${err}`);
    });
  
    db.on("disconnected", () => {
      console.log("database disconnected");
    });
  
    db.once("open", function () {
      console.log(`database connected to ${this.name} on ${this.host}`);
    });
  }
  */