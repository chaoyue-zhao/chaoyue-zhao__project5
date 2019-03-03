import firebase from 'firebase';

// Initialize Firebase

const config = {
  apiKey: `${process.env.FIREBASE_KEY}`,
  authDomain: "what-cha-think-n.firebaseapp.com",
  databaseURL: "https://what-cha-think-n.firebaseio.com",
  projectId: "what-cha-think-n",
  storageBucket: "what-cha-think-n.appspot.com",
  messagingSenderId: "700881223092"
};

firebase.initializeApp(config);

export default firebase;