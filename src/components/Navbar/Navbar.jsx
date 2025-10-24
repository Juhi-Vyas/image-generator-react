// Navbar.jsx
import React, { useState, useEffect, useRef  } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  const profileRef = useRef();

  // Save user into state and localStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        }));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Load from localStorage only if user === null
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (user === null && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      localStorage.removeItem('user');
      setUser(null);
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <a href="/" className="logo">LOGO</a>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Image Generate</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>AI Chat</Link>

          {!user && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </nav>

        <div className="right-section">
          <DarkModeToggle />
          <div className="profile-container" ref={profileRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="profile-pic" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            )}

            {user && dropdownOpen && (
              <div className="dropdown-menu">
                <div className="user-info">
                  {user.photoURL && <img src={user.photoURL} alt="Profile" className="dropdown-pic" />}
                  <p>{user.displayName || "User"}</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
