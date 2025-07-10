// client/src/main.jsx
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


console.log('🖥️ main.jsx loaded');

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('❌ #root container not found in index.html');
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
