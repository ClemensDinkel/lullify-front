import axios from "axios";
const root = "https://tranquil-reaches-12289.herokuapp.com"

export const register = (newUser) => {
  return axios
    .post(`${root}/register`, newUser)
    .then((response) => {
      console.log("Registered");
    });
};

export const axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': "*",
      'auth-token': localStorage.getItem('auth-token')
  }
};

export const login = (loginUser) => {
  return axios
    .post(`${root}/login`, loginUser)
    .then(response => {
      localStorage.setItem('auth-token', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
};