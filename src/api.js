import axios from "axios";
import queryString from "query-string";
const root = "http://localhost:3001";
// const root = 'https://tranquil-reaches-12289.herokuapp.com';

const api = {
  fetchVideos: async () => {
    return await axios.get(`${root}/videos`);
  },

  getVideoById: async (video_id) => {
    return await axios.get(`${root}/videos/${video_id}`);
  },

  reportVideo: async (video_id, reportData) => {
    return await axios.put(
      `${root}/videos/${video_id}/report`,
      queryString.stringify(reportData)
    );
  },

  loginUser: async (user) => {
    return await axios.post(`${root}/login`, queryString.stringify(user), {
      withCredentials: true,
    });
  },

  logoutUser: async () => {
    return await axios.get(`${root}/logout`,{
      withCredentials: true
    })
  },

  registerUser: async (newUser) => {
    return await axios.post(`${root}/register`, queryString.stringify(newUser));
  },

  fetchSingleUser: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}`);
  },

  updateUser: async (user_id, userData) => {
    return await axios.put(
      `${root}/users/${user_id}`,
      queryString.stringify(userData)
    );
  },

  demoteUser: async (user_id) => {
    return await axios.put(
      `${root}/users/${user_id}/demote`
    )
  },

  promoteUser: async (user_id) => {
    return await axios.put(
      `${root}/users/${user_id}/promote`
    )
  },

  getAllUsers: async () => {
    return await axios.get(`${root}/users`);
  },

  getAllRequests: async () => {
    return await axios.get(`${root}/requests`)
  },

  deleteRequest: async (request_id) => {
    return await axios.delete(`${root}/requests/${request_id}`)
  },

  createPlaylist: async (newPlaylist) => {
    return await axios.post(
      `${root}/playlists`,
      queryString.stringify(newPlaylist)
    );
  },

  getPlaylist: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}/playlists`);
  },

  updatePlaylist: async (user_id, playlist_id, playlistData) => {
    return await axios.get(
      `${root}/users/${user_id}/playlists/${playlist_id}/video`,
      queryString.stringify(playlistData)
    );
  },

  deletePlaylist: async (user_id, playlist_id) => {
    return await axios.delete(
      `${root}/users/${user_id}/playlists/${playlist_id}`
    );
  },

  addVideos: async (newVideo) => {
    return await axios.post(`${root}/videos`, queryString.stringify(newVideo));
  },

  getUploaderAllVideos: async (user_id) => {
    return await axios.get(`${root}/videos/byUploader/${user_id}`);
  },

  deleteUploaderVideo: async (user_id, video_id) => {
    return await axios.delete(`${root}/users/${user_id}/videos/${video_id}`);
  },

  updateUploaderVideo: async (user_id, video_id, videoData) => {
    return await axios.put(
      `${root}/users/${user_id}/videos/${video_id}`,
      queryString.stringify(videoData)
    );
  },
};

export default api;
