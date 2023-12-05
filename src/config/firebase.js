import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv8pnyce1g4rDWAgdWgIvDJHGLfHSF1jA",
  authDomain: "expensestracker-bk.firebaseapp.com",
  projectId: "expensestracker-bk",
  storageBucket: "expensestracker-bk.appspot.com",
  messagingSenderId: "803060562149",
  appId: "1:803060562149:web:b46c438e386a7ad6513c0c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
