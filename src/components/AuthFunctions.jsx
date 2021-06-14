import axios from "axios";

export const register = (newUser) => {
  return axios
    .post(`https://tranquil-reaches-12289.herokuapp.com/register`, newUser)
    .then((response) => {
      console.log("Registered");
    });
};