import Previews from './Previews'
import Playlists from './Playlists'
import { axiosConfig } from './AuthFunctions';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap'
const root = "https://tranquil-reaches-12289.herokuapp.com"

const Home = ({user}) => {

  const [data, setData] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    await axios.get(`https://tranquil-reaches-12289.herokuapp.com/videos`)
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [data])

  const getUser = () => {
    return axios
      .get(`${root}/users`, axiosConfig)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="main">
      <Previews videos={videos} loading={loading} setLoading={setLoading} />
      <Playlists user={user} />
    </div>
  )
}

export default Home