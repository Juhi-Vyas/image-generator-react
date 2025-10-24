import React, { useEffect, useState } from 'react';
import  "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (

    <button  className='dark-mode-toggle'
    onClick={() => setDarkMode(!darkMode)}
    >
      <img
    src={darkMode ? 'src/assets/night-mode.png' : 'src/assets/brightness.png'}              
    
  />
    </button>
  );
};

export default DarkModeToggle;
