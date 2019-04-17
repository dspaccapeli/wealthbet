import {FirebaseConfig} from "./apiKeys";

// Initialize firebase
import firebase from "firebase";
let app = firebase.initializeApp(FirebaseConfig);
export const database = app.database();
export default firebase;