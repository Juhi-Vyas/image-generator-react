import React from 'react';
import './Auth.css';

function Signup() {
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
