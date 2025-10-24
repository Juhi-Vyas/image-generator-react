// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
apiKey: "AIzaSyAj7SQiQsFzGDp2ctZmBdQkDm_uU4fh-_E",
  authDomain: "image-generator-203a0.firebaseapp.com",
  projectId: "image-generator-203a0",
  storageBucket: "image-generator-203a0.firebasestorage.app",
  messagingSenderId: "819298667576",
  appId: "1:819298667576:web:1c62def5028b7cc365aacd",
  measurementId: "G-CMFDN7646F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup };
