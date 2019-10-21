import firebase from "firebase/app";

export default firebaseConfig = {
  apiKey: "AIzaSyBlGn71AhNFj0OsnwiFuGpUq7viEHmg8hk",
  authDomain: "canchas-deportivas.firebaseapp.com",
  databaseURL: "https://canchas-deportivas.firebaseio.com",
  projectId: "canchas-deportivas",
  storageBucket: "canchas-deportivas.appspot.com",
  messagingSenderId: "829144963943",
  appId: "1:829144963943:web:55be3d2059c78fac166dc2"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
