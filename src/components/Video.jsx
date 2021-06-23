import ReactPlayer from "react-player/lazy";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../App.css";
import { useState, useEffect, useContext } from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiDocumentReport } from "react-icons/hi";
import api from '../api'
import { UserContext } from '../context/UserContext'


const Video = ({ video}) => {

  console.log(video)

  const [readMore, setReadMore] = useState(false)
  //const [myvideoIndex, setMyvideoIndex] = useState(0);
  const [editMode, setEditMode] = useState(true)
  const {dTk, sUI} = useContext(UserContext)
  const [decToken] = dTk
  const [singleUserInfo] = sUI

  const secToMinConverter = (n) => {
    return n / 60;
  }

  const reportButton = () => {
    if(decToken && decToken.id) {
      console.log(decToken.id)
      api.reportVideo(video[0]._id, {user_id : decToken.id})
    .then(() => {
    alert('Video has been reported')
    setEditMode(false)
  })
    .catch(err => console.log(err))
    }
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
                playing={false}
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
                    <b>{editMode ?
                    "Report"
                  :
                  "Reported"}</b>
                  </Button>
                </div>
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Video
