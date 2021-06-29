import { useContext } from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlaylistContext } from '../context/PlaylistContext';

const Previews = () => {
  const [videos] = useContext(VideoContext)
  const [playlist, setPlaylist] = useContext(PlaylistContext)

  return (
    <div className="previews">
      {
        videos && videos.map((video, index) => {
          return (
            <div>
              <Card key={index} bg="light" className="previews-card-container">
                <Link to={`/player/${video._id}`} onClick={() => setPlaylist([])}>
                  <img variant="top" src={video.video_img_url} height="100px" width="100%" />
                </Link>
                <Card.Body>
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
