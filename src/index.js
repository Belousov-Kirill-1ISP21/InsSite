import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';


// Жёсткий сброс кеша перед рендерингом
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload(); // Полная перезагрузка вместо HMR
  });
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
