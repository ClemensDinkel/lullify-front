import Previews from './Previews'
import Playlists from './Playlists'
import { axiosConfig } from './AuthFunctions';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {

    const root = "https://tranquil-reaches-12289.herokuapp.com"

    const [data, setData] = useState([])

    /* useEffect(() => {
        getUser()
    }, [data])

    const getUser = () => {
        return axios
          .get(`${root}/users`, axiosConfig)
          .then((response) => {
            console.log(response.data);
          });
      }; */

    return (
        <>
            <Previews/>
            <Playlists/>
        </>
    )
}

export default Home