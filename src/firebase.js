import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: `${process.env.FIREBASE_KEY}`,
  authDomain: "what-are-you-thinking.firebaseapp.com",
  databaseURL: "https://what-are-you-thinking.firebaseio.com",
  projectId: "what-are-you-thinking",
  storageBucket: "what-are-you-thinking.appspot.com",
  messagingSenderId: "86680060665"
};

firebase.initializeApp(config);

export default firebase;