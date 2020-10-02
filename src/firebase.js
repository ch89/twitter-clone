import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDxtEYjcF7u_7JCbMJtUs8BsSsb3TUkXDY",
  authDomain: "twitter-clone-dcbc5.firebaseapp.com",
  databaseURL: "https://twitter-clone-dcbc5.firebaseio.com",
  projectId: "twitter-clone-dcbc5",
  storageBucket: "twitter-clone-dcbc5.appspot.com",
  messagingSenderId: "589344402537",
  appId: "1:589344402537:web:660c2e9c02e64ccf03c6f8",
  measurementId: "G-0SZ90EYN1X"
};

const app = firebase.initializeApp(firebaseConfig)

export default app.firestore()