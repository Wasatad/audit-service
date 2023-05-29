import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu7WfOWaNV4W3TYCDdVM6pjeMsr4v2jGсw",
  authDomain: "audit.firebaseapp.com",
  projectId: "audit",
  storageBucket: "audit.appspot.com",
  messagingSenderId: "603332532210",
  appId: "1:6033325ф32210:web:a4f662dde3dcd288d9fd6b",
};
const firebaseApp = initializeApp(firebaseConfig);

export default getStorage(firebaseApp);
