import {FirebaseConfig} from "./apiKeys";

// Initialize firebase
import firebase from "firebase";
firebase.initializeApp(FirebaseConfig);
export default firebase;