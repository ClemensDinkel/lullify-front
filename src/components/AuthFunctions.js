import axios from "axios";
// const root = "http://localhost:3001"
const root = "https://tranquil-reaches-12289.herokuapp.com"
const auth_token = localStorage.getItem('auth-token')
const headers = auth_token ? {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': "*",
  'auth-token': localStorage.getItem('auth-token')
} : {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': "*"
}

export const register = (newUser) => {
  return axios
    .post(`${root}/register`, newUser)
    .then(() => console.log("Registered"));
};

export const axiosConfig = {
  headers: headers
};

console.log(axiosConfig)

export const login = (loginUser) => {
  return axios
    .post(`${root}/login`, loginUser)
    .then(response => {
      console.log(response.data.accessToken)
      localStorage.setItem('auth-token', response.data.accessToken)
      localStorage.setItem('refresh-token', response.data.refreshToken)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
};