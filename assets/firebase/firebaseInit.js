import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu7WfOWaNV4W3TYCDdVM6pjeMsr4v2jGw",
  authDomain: "moab-audit.firebaseapp.com",
  projectId: "moab-audit",
  storageBucket: "moab-audit.appspot.com",
  messagingSenderId: "603332532210",
  appId: "1:603332532210:web:a4f662dde3dcd288d9fd6b",
};
const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore(firebaseApp);
