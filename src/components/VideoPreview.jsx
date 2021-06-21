import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import Player from "./Player";

const VideoPreview = ({ video, index }) => {
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
  );
};

export default VideoPreview;
