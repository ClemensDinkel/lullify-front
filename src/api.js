import axios from "axios";
const root = "https://tranquil-reaches-12289.herokuapp.com";
// const root = "http://localhost:3001";

const api = {
  //Auth Routes

  loginUser: async (user) => {
    return await axios.post(`/login`, user, {
      /* withCredentials: true, */
      baseURL: root,
    });
  },

  logoutUser: async () => {
    return await axios.get(`/logout`, {
      baseURL: root,
      /* withCredentials: true, */
    });
  },

  registerUser: async (newUser) => {
    return await axios.post(`${root}/register`, newUser, {
      baseURL: root,
    });
  },

  refreshUserToken: async () => {
    return await axios.post(`/refresh`, {}, {
      baseURL: root,
      /* withCredentials:true */
    });
  },

  fetchSingleUser: async (user_id) => {
    return await axios.get(`/users/${user_id}`, {
      baseURL: root
    });
  },

  // User-User

  updateUser: async (user_id, userData) => {
    return await axios.put(`/users/${user_id}`, userData, {
      baseURL: root
    });
  },

  // Admin- User

  demoteUser: async (user_id) => {
    return await axios.put(`/users/${user_id}/demote`, {}, {
      baseURL: root,
    });
  },

  promoteUser: async (user_id) => {
    return await axios.put(`/users/${user_id}/promote`, {}, {
      baseURL: root,
    });
  },

  getAllUsers: async () => {
    return await axios.get(`/users`, {
      baseURL: root,
    });
  },

  getAllRequests: async () => {
    return await axios.get(`/requests`, {
      baseURL: root,
    });
  },

  deleteRequest: async (request_id) => {
    return await axios.delete(`/requests/${request_id}`, {
      baseURL: root,
    });
  },

  // Playlist & Favorites management

  createPlaylist: async (newPlaylist) => {
    return await axios.post(`/playlists`, newPlaylist, {
      baseURL: root,
    });
  },

  getPlaylist: async (user_id) => {
    return await axios.get(`/users/${user_id}/playlists`, {
      baseURL: root,
    });
  },

  addVideoToPlaylist: async (user_id, playlist_id, videoId) => {
    return await axios.put(
      `/users/${user_id}/playlists/${playlist_id}/addvideo`, videoId, {
      baseURL: root,
    });
  },

  updatePlaylist: async (user_id, playlist_id, playlistData) => {
    return await axios.put(
      `/users/${user_id}/playlists/${playlist_id}`, playlistData, {
      baseURL: root,
    });
  },

  removeVideoFromPlaylist: async (user_id, playlist_id, videoId) => {
    return await axios.put(`/users/${user_id}/playlists/${playlist_id}/removevideo`, videoId, {
      baseURL: root,
    });
  },

  deletePlaylist: async (user_id, playlist_id) => {
    return await axios.delete(`/users/${user_id}/playlists/${playlist_id}`, {
      baseURL: root,
    });
  },

  addVideoToFavorite: async (user_id, videoId) => {
    return await axios.put(`/users/${user_id}/favorites`, videoId, {
      baseURL: root,
    });
  },

  removeVideoFromFavorite: async (user_id, videoId) => {
    return await axios.put(`/users/${user_id}/removefavorites`, videoId, {
      baseURL: root,
    });
  },

  // Video Routes

  // Only for Admin
  getAllVideos: async (lang, filter) => {
    return await axios.get(`/videos`, {
      params: {
        lang: lang,
        filter: filter,
      },
      baseURL: root,
    });
  },

  // For Users
  getVideos: async (lang, filter) => {
    return await axios.get(`/videos/collection`, {
      params: {
        lang: lang,
        filter: filter,
      },
      baseURL: root,
    });
  },

  getVideoById: async (video_id) => {
    return await axios.get(`/videos/${video_id}`, {
      baseURL: root,
    });
  },

  reportVideo: async (video_id, reportData) => {
    return await axios.put(`/videos/${video_id}/report`, reportData, {
      baseURL: root,
    });
  },

  unReportVideo: async (video_id, deReportData) => {
    return await axios.put(`/videos/${video_id}/unreport`, deReportData, {
      baseURL: root,
    });
  },

  addVideos: async (newVideo) => {
    return await axios.post(`/videos`, newVideo, {
      baseURL: root,
    });
  },

  // Content_creator routes

  getUploaderAllVideos: async (user_id) => {
    return await axios.get(`/videos/byUploader/${user_id}`, {
      baseURL: root,
    });
  },

  deleteUploaderVideo: async (user_id, video_id) => {
    return await axios.delete(`/users/${user_id}/videos/${video_id}`, {
      baseURL: root,
    });
  },

  updateUploaderVideo: async (user_id, video_id, videoData) => {
    return await axios.put(`/users/${user_id}/videos/${video_id}`, videoData, {
      baseURL: root,
    }
    );
  },

  getVideoFromYTApi: async (q) => {
    return await axios.get(`/ytapi`, {
      params: {
        q: q
      },
      baseURL: root,
    })
  },
};

export default api;
