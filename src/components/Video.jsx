import ReactPlayer from "react-player/lazy";
import { Container, Col, Row, Button, Accordion } from "react-bootstrap";
import "../App.css";
import { useState, useContext } from "react";
import {AiOutlineHeart} from 'react-icons/ai'
import {AiTwotoneHeart} from 'react-icons/ai'
import api from "../api";
import { UserContext } from "../context/UserContext";
import { AccordionDetails } from "@material-ui/core";


const Video = ({ video }) => {

  console.log(video);

  const [readMore, setReadMore] = useState(false);
  
  const [editMode, setEditMode] = useState(true);
  const { dTk, sUI } = useContext(UserContext);
  const [decToken] = dTk;
  

  const secToMinConverter = (n) => {
    return n / 60;
  };

  const reportButton = () => {
    if (decToken && decToken.id) {
      console.log(decToken.id);
      api
        .reportVideo(video[0]._id, { user_id: decToken.id })
        .then(() => {
          alert("Video has been reported");
          setEditMode(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="video-container">
       <Container>
        <Row>
          <Col>
            <ReactPlayer
              controls={true}
              className="react-player"
              url={video[0].video_url}
              muted={false}
              playing={false}
              width="100%"
              height="600px"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="video-description">
              <h3>{video[0].title}</h3>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="light"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? <b>Show More</b> : <b>Show less</b>}
                </Button>
                <Button variant="light" disabled={!editMode ? false : true} onClick={() => reportButton()}>
                  <b>{video[0].reportedBy.includes(decToken.id) ? "Reported" : "Report"}</b>
                </Button>
              </div>
              <div>
                {
                  readMore ?
                    <div
                      style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                      <h6>Duration: {secToMinConverter(video[0].duration)} mins</h6>
                      <p>Description: {video[0].short_description}</p>
                    </div> :
                    null
                } 
              </div>
            </div>
          </Col>
        </Row>
      </Container> 
      </div>
    </>
  );
};

export default Video;





              

              

              {/* <div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b>Read More</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h6>
                        Duration: {secToMinConverter(video[0].duration)} mins
                      </h6>
                      <p>Description: {video[0].short_description}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div> */}