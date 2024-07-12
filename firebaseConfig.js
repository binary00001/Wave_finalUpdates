// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkreomgboVPDI1jH0GNt5razfKKeWnYto",
  authDomain: "wave-9979b.firebaseapp.com",
  projectId: "wave-9979b",
  storageBucket: "wave-9979b.appspot.com",
  messagingSenderId: "287332675076",
  appId: "1:287332675076:web:dd8f690fb47473625e4f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db=getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');