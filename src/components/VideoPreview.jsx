import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import '../App.css'

const VideoPreview = ({ video, index }) => {
  return (
    <div className="card-container">
      <Card key={index} bg='light'>
        <Link to={`/player/${video._id}`}>
          <img
            variant="top"
            src={video.video_img_url}
            height="60px" />
        </Link>
        <Card.Body>
          <Card.Title>
            {video.title}
          </Card.Title>
          <Card.Text>
            {video.artist}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default VideoPreview;