import Previews from './Previews'
import Playlists from './Playlists'
import { useState, useEffect } from 'react';
import api from "../api";


const Home = () => {

  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    api.fetchVideos()
      .then(res => {
        console.log(res)
        setVideos(res.data)
      })
      .catch(err => console.log(err))
    setLoading(false)
  }, [])

return (
  <div className="main">
    <Previews videos={videos} />
    <Playlists />
  </div>
)
}

export default Home