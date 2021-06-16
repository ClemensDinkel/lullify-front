import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log(request)
  return request
})

/* axios.interceptors.request.use(config => {
  config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  }
}) */

axios.interceptors.response.use(response => {
  console.log(response)
  return response
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
