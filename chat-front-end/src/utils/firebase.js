// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC9LeMCDF4w9NBEntNPk1WEXniP-47MAu0",
  authDomain: "chat-app-87d08.firebaseapp.com",
  projectId: "chat-app-87d08",
  storageBucket: "chat-app-87d08.appspot.com",
  messagingSenderId: "111725535105",
  appId: "1:111725535105:web:7728aca5ff9e32d80a9280",
  measurementId: "G-TR13887NY7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
