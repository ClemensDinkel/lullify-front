<<<<<<< HEAD
import axios from "axios";
import queryString from "query-string";
const root = "http://localhost:3001";
//const root = "https://tranquil-reaches-12289.herokuapp.com";

const api = {
  createPlaylist: async (newPlaylist) => {
    return await axios.post(`${root}/playlists`, newPlaylist);
  },
  fetchSingleUser: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}`);
  },
  fetchVideos: async () => {
    return await axios.get(`${root}/videos`);
  },
  getPlaylist: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}/playlists`);
  },
  loginUser: async (user) => {
    return await axios.post(`${root}/login`, user);
  },
  registerUser: async (newUser) => {
    return await axios.post(`${root}/register`, newUser);
  },
  updateUser: async (user_id, userData) => {
    return await axios.put(
      `${root}/users/${user_id}`,
      queryString.stringify(userData)
    );
  },
};
=======
import axios from 'axios'
import queryString from 'query-string';
const root = "http://localhost:3001"
// const root = 'https://tranquil-reaches-12289.herokuapp.com';

const api = {
  createPlaylist: async(newPlaylist) => {
    return await axios.post(`${root}/playlists`, newPlaylist)
  },
  fetchSingleUser: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}`)
  },
  fetchVideos: async () => {
    return await axios.get(`${root}/videos`)
  },
  getPlaylist: async(user_id) => {
    return await axios.get(`${root}/users/${user_id}/playlists`)
  },
  loginUser: async(user) => {
    return await axios.post(`${root}/login`, user)
  },
  registerUser: async(newUser) => {
    return await axios.post(`${root}/register`, newUser)
  },
  updateUser: async (user_id, userData) => {
    return await axios.put(`${root}/users/${user_id}`, queryString.stringify(userData))
  }
}
>>>>>>> 1f7b7b504ece00c8c81cd7c11f26a8ac4ecd2fb8

export default api;
