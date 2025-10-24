// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css'; // plain css

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // after login go to home
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Google login failed.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">Submit</button>

        <p className="auth-link">
          New user? <Link to="/signup">Register Here</Link>
        </p>

        <div className="separator">— Or continue with —</div>

        <button type="button" onClick={handleGoogleLogin} className="google-btn">
          <img src="src/assets/google.png" alt="Google Logo" className='google-logo'/>
          &nbsp; Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
