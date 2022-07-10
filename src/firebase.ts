// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJTmvHo9EnxRBMEkrgNZ36b8sj7j34h3w",
  authDomain: "tech-app-7e34d.firebaseapp.com",
  projectId: "tech-app-7e34d",
  storageBucket: "tech-app-7e34d.appspot.com",
  messagingSenderId: "62752511450",
  appId: "1:62752511450:web:ffe889442531da03329ce3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);