import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../App.css";

const VideoPreview = ({ video, index }) => {
  return (
    <div className="card-container">
     <Card key={index} bg="light">
        <Link to={`/player/${video._id}`}>
          <img variant="top" src={video.video_img_url} height="60px" />
        </Link>
        <Card.Body>
          <Card.Title>{video.title}</Card.Title>
          <Card.Text>{video.artist}</Card.Text>
        </Card.Body>
      </Card> 

      {/* <div class="card" style="width: 18rem;">
        <img
          class="card-img-top"
          src={video.video_img_url}
          alt="Video image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{video.title}</h5>
          <p class="card-text">{video.artist}</p>
        </div>
      </div> */}

    </div>
  );
};

export default VideoPreview;
