import axios from "axios";
//const root = "http://localhost:3001";
const root = "https://tranquil-reaches-12289.herokuapp.com";

const api = {
  loginUser: async (user) => {
    return await axios.post(`/login`, user, {
      /* withCredentials: true, */
      baseURL: root,
    });
  },

  logoutUser: async () => {
    return await axios.get(`${root}/logout`, {
      /* withCredentials: true, */
    });
  },

  registerUser: async (newUser) => {
    return await axios.post(`${root}/register`, newUser);
  },

  refreshUserToken: async () => {
    return await axios.post(
      `${root}/refresh`,
      {}
      /* {withCredentials:true} */
    );
  },

  fetchSingleUser: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}`);
  },

  updateUser: async (user_id, userData) => {
    return await axios.put(`${root}/users/${user_id}`, userData);
  },

  demoteUser: async (user_id) => {
    return await axios.put(`${root}/users/${user_id}/demote`);
  },

  promoteUser: async (user_id) => {
    return await axios.put(`${root}/users/${user_id}/promote`);
  },

  getAllUsers: async () => {
    return await axios.get(`${root}/users`);
  },

  getAllRequests: async () => {
    return await axios.get(`${root}/requests`);
  },

  deleteRequest: async (request_id) => {
    return await axios.delete(`${root}/requests/${request_id}`);
  },

  createPlaylist: async (newPlaylist) => {
    return await axios.post(`${root}/playlists`, newPlaylist);
  },

  getPlaylist: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}/playlists`);
  },

  addVideoToPlaylist: async (user_id, playlist_id, videoId) => {
    return await axios.put(
      `${root}/users/${user_id}/playlists/${playlist_id}/addvideo`,
      videoId
    );
  },

  removeVideoFromPlaylist: async (user_id, playlist_id, videoId) => {
    return await axios.put(
      `${root}/users/${user_id}/playlists/${playlist_id}/removevideo`,
      videoId
    );
  },

  deletePlaylist: async (user_id, playlist_id) => {
    return await axios.delete(
      `${root}/users/${user_id}/playlists/${playlist_id}`
    );
  },

  addVideoToFavorite: async (user_id, videoId) => {
    return await axios.put(`${root}/users/${user_id}/favorites`, videoId);
  },

  removeVideoFromFavorite: async (user_id, videoId) => {
    return await axios.put(`${root}/users/${user_id}/removefavorites`, videoId);
  },

  getVideos: async () => {
    return await axios.get(`${root}/videos`);
  },

  getVideoById: async (video_id) => {
    return await axios.get(`${root}/videos/${video_id}`);
  },

  reportVideo: async (video_id, reportData) => {
    return await axios.put(`${root}/videos/${video_id}/report`, reportData);
  },

  unReportVideo: async (video_id, deReportData) => {
    return await axios.put(`${root}/videos/${video_id}/unreport`, deReportData);
  },

  addVideos: async (newVideo) => {
    return await axios.post(`${root}/videos`, newVideo);
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
      videoData
    );
  },
};

export default api;
