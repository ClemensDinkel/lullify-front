import axios from 'axios'
import { axiosConfig } from './components/AuthFunctions';

// const root = "http://localhost:3001"
const root = "https://tranquil-reaches-12289.herokuapp.com"


export const fetchVideos = async () => {
    await axios.get(`${root}/videos`)
        .then(res => res.data)
        .catch(err => console.log(err))
} 

const api = {
    fetchVideos: async () => {
        await axios.get(`${root}/videos`).then(res => {console.log(res.data)})
    },
    fetchVideos2: async () => {
        await axios.get(`${root}/videos`)
    },
    fetchSingleUser: async (user_id) => {
        await axios.get(`${root}/users/${user_id}`, axiosConfig)
    }
}

export default api;