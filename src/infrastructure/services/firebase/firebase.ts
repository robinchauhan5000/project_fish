import firebase from "firebase-admin";

var serviceAccount = require("./serviceAccountKey.json");


const firebaseInitialize = async () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}


export default firebaseInitialize