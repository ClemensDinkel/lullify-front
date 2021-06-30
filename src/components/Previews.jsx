import { useContext } from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlaylistContext } from '../context/PlaylistContext';

const Previews = () => {
  const [videos] = useContext(VideoContext)
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)
  

  const playPlaylist = () => {
    const autoPlay=[]
    videos.forEach(video => autoPlay.push(video._id))
    console.log(autoPlay)
    setAutoPlaylist(autoPlay)
  }

  return (
    <div className="previews">
      {
        videos && videos.map((video, index) => {
          return (
            <div>
              <Card key={index} style={{background: "rgba(0,0,0,0.4)"}} text="white" className="previews-card-container" onClick={()=> playPlaylist()}>
                <Link to={`/player/${video._id}`}>
                  <img variant="top" src={video.video_img_url} height="140px" width="100%" />
                </Link>
                <Card.Body style={{textAlign: "left"}}>
                  <Card.Title>{video.title}</Card.Title>
                  <Card.Text>{video.artist}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        })
      }
    </div >
  )
}

export default Previews
