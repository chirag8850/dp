import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGkBO9e77IYi3f7sRxAYh2SkcAC-U46I4",
  authDomain: "document-24ec3.firebaseapp.com",
  projectId: "document-24ec3",
  storageBucket: "document-24ec3.appspot.com",
  messagingSenderId: "916643244424",
  appId: "1:916643244424:web:b694010fa9b4a7d41eb23d",
  // apiKey: "AIzaSyD0aMSA76vA5JQZ_-gbBZ7R7aekgXP4U9k",
  // authDomain: "drifko-a823c.firebaseapp.com",
  // projectId: "drifko-a823c",
  // storageBucket: "drifko-a823c.appspot.com",
  // messagingSenderId: "1072407643451",
  // appId: "1:1072407643451:web:3339e8d59fc468ae1f631e",
  // measurementId: "G-X4GHVY63EX",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export default app;
export { app, firestore, storage };
