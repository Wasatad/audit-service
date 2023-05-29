import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu7WfOWaN4W3TYCDdVM6pjeMsr4v2jGw",
  authDomain: "audit.firebaseapp.com",
  projectId: "audit",
  storageBucket: "audit.appspot.com",
  messagingSenderId: "603332532210",
  appId: "1:603332532210:web:a4f662dde3dcd288d9fd6",
};
const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore(firebaseApp);
