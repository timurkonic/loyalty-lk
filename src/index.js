import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './img/logo.svg';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="logo"><img src={logo} width="300px" alt="ЛИНИЯ"/></div>
    <App />
  </React.StrictMode>
);