import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './main.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={false}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);