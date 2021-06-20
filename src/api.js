import axios from 'axios'
const root = "http://localhost:3001"
// const root = 'https://tranquil-reaches-12289.herokuapp.com';

const api = {
  fetchVideos: async () => {
    await axios.get(`${root}/videos`).then(res => { console.log(res.data) })
  },
  fetchSingleUser: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}`)
  },
  updateUser: async (user_id, userData) => {
    return await axios.put(`${root}/users/${user_id}`, {...userData})
  },
  createPlaylist: async(newPlaylist) => {
    return await axios.post(`${root}/playlists`, {...newPlaylist})
  },
  getPlaylist: async(user_id) => {
    return await axios.get(`${root}/users/${user_id}/playlists`)
  },
  registerUser: async(newUser) => {
    return await axios.post(`${root}/register`, {...newUser})
  },
  loginUser: async(user) => {
    return await axios.post(`${root}/login`, user)
  }
}

export default api;
