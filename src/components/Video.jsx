import ReactPlayer from "react-player/lazy";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../App.css";
import { useState, useEffect } from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiDocumentReport } from "react-icons/hi";
import api from '../api'


const Video = ({ video, user }) => {

  console.log(video)

  const [readMore, setReadMore] = useState(false)
  const [myvideoIndex, setMyvideoIndex] = useState(0);
  const [editMode, setEditMode] = useState(true)

  const secToMinConerter = (n) => {
    return n / 60;
  }

  const reportButton = () => {
    
    api.reportVideo(video[0]._id)
    .then(() => {
    alert('video reported')
    setEditMode(false)
  })
    .catch(err => console.log(err))
  }

  

  return (
    <>
      <div className='video-container'>
        <Container>
          <Row>
            <Col>
              <ReactPlayer
                controls={true}
                className='react-player'
                url={video[0].video_url}
                muted={false}
                playing={true}
                /* onEnded={playNext} */
                width='100%'
                height='600px'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='video-description'>
                <h3>{video[0].title}</h3>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="light" onClick={() => setReadMore(!readMore)}>
                    {!readMore ? <b>Show More</b> : <b>Show less</b>}
                  </Button>
                  <Button variant="light"
                  onClick={()=> reportButton()}>
                    {editMode ?
                    <HiOutlineDocumentReport />
                  :
                  <HiDocumentReport />}
                  </Button>
                </div>
                {
                  readMore ?
                    <div
                      style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                      <h6>Duration: {secToMinConerter(video[0].duration)} mins</h6>
                      <p>Description: {video[0].short_description}</p>
                    </div> :
                    null
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Video
