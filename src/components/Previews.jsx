import { useContext } from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Previews = () => {
  const [videos] = useContext(VideoContext)
  console.log(videos)
  return (
    <div className="previews">
      {
        videos && videos.map((video, index) => {
          return (
            <div className="card-container">
              <Card key={index} bg="light">
                <Link to={`/player/${video._id}`}>
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
