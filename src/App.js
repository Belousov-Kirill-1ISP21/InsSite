import styles from './css/appStyle.module.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './Routes'; 
import store from './store/store';

export function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Router>
          <Routes />
        </Router>
      </div>
    </Provider>
  );
}

export default App;