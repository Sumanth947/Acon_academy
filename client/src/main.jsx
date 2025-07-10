// client/src/main.jsx
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


console.log('🖥️ main.jsx loaded');

const rootEl = document.getElementById('root');
if (!rootEl) {
  
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
