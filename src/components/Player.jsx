import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Playlists from './Playlists'
import Video from './Video'
import '../App.css'
import api from '../api'

const Player = () => {
  const {id} = useParams()
  const [video, setVideo] = useState()
  console.log(id);

  console.log(video)

  useEffect(() => {
    api.getVideoById(id)
    .then(res => setVideo(res.data))
    .catch(err => console.log(err))
  },[])


  return (
    <>
      <div className="player-container">
       {
              video ?
                <Video video={video} setVideo={setVideo}/> :
                <p>Loading..</p>
            } 
            <Playlists />
      </div>

    </>
  )
}

export default Player