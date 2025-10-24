import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import './App.css';
import './dark-mode.css'; 
import ImageGenerator from './components/ImageGenerator';
import ChatComponent from './components/ChatComponent';
import Particles from './reactbits/Particles';
import Navbar from "./components/Navbar/Navbar";
import Login from './components/Login';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Router>
        <div style={{  position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,  // background behind everything
      overflow: 'hidden' 
    }}>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

      <Navbar user={user} />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="app">
                <button className={activeTab === 'image-generator' ? 'active' : ''} onClick={() => handleTabChange('image-generator')}>
                  Image Generator
                </button>
                <button className={activeTab === 'chat' ? 'active' : ''} onClick={() => handleTabChange('chat')}>
                  Ask AI
                </button>
              </div>

              <div>
                {activeTab === 'image-generator' && <ImageGenerator />}
                {activeTab === 'chat' && <ChatComponent />}
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
