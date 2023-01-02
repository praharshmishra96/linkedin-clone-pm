import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOgZtYgbeekpAzag1qEljdrms0I9nrP3Y",
    authDomain: "linkedin-clone-pm.firebaseapp.com",
    projectId: "linkedin-clone-pm",
    storageBucket: "linkedin-clone-pm.appspot.com",
    messagingSenderId: "698640518421",
    appId: "1:698640518421:web:232912ace27835e5682d1c"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
