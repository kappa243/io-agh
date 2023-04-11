import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzgYYECrX5yHQKPfBzNnNPdqT0_Nw5uck",
  authDomain: "ioioio-xd.firebaseapp.com",
  projectId: "ioioio-xd",
  storageBucket: "ioioio-xd.appspot.com",
  messagingSenderId: "308264723178",
  appId: "1:308264723178:web:617a42b456d90c84826d93"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
