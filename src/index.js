import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const setupAxios = () => {
  // axios.defaults.baseURL = `http://localhost:4000/api/v1`;
  axios.defaults.baseURL = `deploy-ImageUploader-MERN-back/api/v1`;
  axios.defaults.headers = {
    'Cache-Control': 'no-cache,no-store',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
};

setupAxios();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

