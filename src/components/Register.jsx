import React, { useState } from 'react';
import './Auth.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Register() {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');

    async function handleRegister(e){
      e.preventDefault()
      const user = auth.currentUser
      console.log(user)
      try {
        await createUserWithEmailAndPassword(auth,email,password)
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
    alert("This email is already registered. Please login.");
  } else {
    alert(error.message);
  }
      }
    }
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
      <h2>Register</h2>

        <input 
        type="text" 
        placeholder="Full name" 
        required 
        onChange={(e)=>{setFullname(e.target.value)}}
        />

        <input 
        type="email" 
        placeholder="Email" 
        required 
        onChange={(e)=>{setEmail(e.target.value)}}
        />

        <input type="password" 
        placeholder="Password" 
        required 
        onChange={(e)=>{setPassword(e.target.value)}}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
