import styles from './css/appStyle.module.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'; 
import { AuthProvider } from './scripts/AuthContext.js';

function App() {

  return (
    
    <div className={styles.App}>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;

