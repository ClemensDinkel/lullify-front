import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Obtain the fresh token each time the function is called
const getAccessToken = () => {
  return localStorage.getItem('auth-token');
}

// Use interceptor to inject the access token to requests
axios.interceptors.request.use(request => {
  request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  console.log(request)
  return request;
});

axios.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});

/* axios.interceptors.response.use(
  (response) => {
    console.log(response)
    return response;
  },
  (error) => {
    console.log(error)
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh-token");
    // let retry = false
    if (
      refreshToken &&
      (error.response.status === 401) &&
      //!retry
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // retry = true
      return axios.post(`${root}/refresh`,{}, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': "*",
          'auth-token': refreshToken
        }
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
); */

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
