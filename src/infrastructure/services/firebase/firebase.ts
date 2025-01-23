import firebase from "firebase-admin"

var serviceAccount = require("./serviceAccountKey.json")

const firebaseInitialize = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    })
  }
}

export default firebaseInitialize
