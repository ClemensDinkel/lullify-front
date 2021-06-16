import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Playlists from './Playlists'
import axios from 'axios'
import Video from './Video'
import '../App.css'


const Player = () => {
    const {id} = useParams()

    const [loading, setLoading] = useState(true)

    const [video, setVideo] = useState()

    console.log(video)

    useEffect(() => {
        fetchVideoById()
      },[])

    const fetchVideoById = async () => {
        await axios.get(`https://tranquil-reaches-12289.herokuapp.com/videos/${id}`)
            .then(res => {
              setVideo(res.data)
            })
            .catch(err => console.log(err))
            setLoading(false)
    }
    return (
        <>
        
{
            !loading ? 
            <Video video={video}/> :
            <p>Loading..</p>
            } 
            <Playlists/>
           
        </>
    )
}

export default Player