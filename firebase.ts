import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDemo_MZVisuals_Replace_With_Real_Key",
  authDomain: "mzvisuals-agency.firebaseapp.com",
  projectId: "mzvisuals-agency",
  storageBucket: "mzvisuals-agency.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
