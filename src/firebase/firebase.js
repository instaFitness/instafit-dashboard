import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCGyK61nZy3vrCaWUJCBvJ7I0SFn0IEGPI",
  authDomain: "instafit-2494d.firebaseapp.com",
  projectId: "instafit-2494d",
  storageBucket: "instafit-2494d.appspot.com",
  messagingSenderId: "946417986352",
  appId: "1:946417986352:web:2e3ee0b6ba4e22fdd2f6f5",
  measurementId: "G-JSLLVF1HZ2",
}

const app = initializeApp(firebaseConfig)

export const database = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app)
