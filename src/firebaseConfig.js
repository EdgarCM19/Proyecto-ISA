import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHrfdPE234FK4Xv1B5x4nqIT5wdIQBP14",
  authDomain: "proyecto-isa-255e7.firebaseapp.com",
  projectId: "proyecto-isa-255e7",
  storageBucket: "proyecto-isa-255e7.appspot.com",
  messagingSenderId: "784397965687",
  appId: "1:784397965687:web:dbb335eea1492c2c17a972",
  measurementId: "G-8CF5B5G3JB"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// eslint-disable-next-line import/no-anonymous-default-export
export default db;
