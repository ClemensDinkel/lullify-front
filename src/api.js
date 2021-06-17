import axios from "axios";
import { axiosConfig } from "./components/AuthFunctions";

// const root = "http://localhost:3001"
const root = "https://tranquil-reaches-12289.herokuapp.com";

export const fetchVideos = async () => {
  await axios
    .get(`${root}/videos`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const api = {
  fetchVideos: async () => {
    await axios.get(`${root}/videos`).then((res) => {
      console.log(res.data);
    });
  },
  fetchSingleUser: async (user_id) => {
    return await axios.get(`${root}/users/${user_id}`, axiosConfig);
  },
  updateUser: async (user_id, userData) => {
    return await axios.put(
      `${root}/users/${user_id}`,
      { ...userData },
      axiosConfig
    );
  },
};

export default api;