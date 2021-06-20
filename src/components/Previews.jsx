import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import { Container, Col, Row } from "react-bootstrap";

const Previews = ({ videos }) => {
  console.log(videos);
  return (
    <>
      <Container>
        <Row>
          {videos &&
            videos.map((video, index) => {
              return (
                <Col xs={12} sm={12} md={4} lg={4}>
                  <Card
                    key={index}
                    bg="light"
                    style={{ width: "18rem", height: "20rem" }}
                  >
                    <Link to={`/player/${video._id}`}>
                      <Card.Img
                        variant="top"
                        src={video.video_img_url}
                        height="180rem"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{video.title}</Card.Title>
                      <Card.Text>{video.artist}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default Previews;
