
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtdbYLU_6f_OQTBB_8--B_p9eYd29cvUs",
  authDomain: "miniblog-9b933.firebaseapp.com",
  projectId: "miniblog-9b933",
  storageBucket: "miniblog-9b933.firebasestorage.app",
  messagingSenderId: "493437834886",
  appId: "1:493437834886:web:ee616b4353b20a83c86307"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};