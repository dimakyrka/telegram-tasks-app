import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDezifmC7dI3RqEKgnNa9__1o8CXRGI2cs",
  authDomain: "telegram-tasks-app.firebaseapp.com",
  projectId: "telegram-tasks-app",
  storageBucket: "telegram-tasks-app.firebasestorage.app",
  messagingSenderId: "336823830946",
  appId: "1:336823830946:web:640cb09b7ac3ad638a4afb"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
