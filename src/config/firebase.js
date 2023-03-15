import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { useNavigate } from "react-router-dom";





const firebaseConfig = {
  apiKey: "AIzaSyB-dBXPXo7qrvGwTjiOlQWdGkKkkmftzTA",
  authDomain: "fir-react-app-36daa.firebaseapp.com",
  projectId: "fir-react-app-36daa",
  storageBucket: "fir-react-app-36daa.appspot.com",
  messagingSenderId: "755788623234",
  appId: "1:755788623234:web:7ecd1090136f201060f39b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, provider)


export const db = getFirestore(app);

export const storage = getStorage(app);
