import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Playlists from './Playlists'
import axios from 'axios'
import Video from './Video'
import '../App.css'
import { Container, Col, Row } from 'react-bootstrap'



const Player = ({ user }) => {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)

  const [video, setVideo] = useState()

  console.log(video)

  useEffect(() => {
    fetchVideoById()
  }, [])

  const fetchVideoById = async () => {
    await axios.get(`https://tranquil-reaches-12289.herokuapp.com/videos/${id}`)
      .then(res => {
        setVideo(res.data)
      })
      .catch(err => console.log(err))
    setLoading(false)
  }
  return (
    <>
      {/* <Container>
        <Row>
          <Col sm={9}>
            {
              !loading ?
                <Video video={video} user={user} /> :
                <p>Loading..</p>
            }
          </Col>

          <Col sm={3}>
            <Playlists user={user} />
          </Col>
        </Row>
      </Container> */}

      <div className="player-container">
      {
              !loading ?
                <Video video={video} user={user} /> :
                <p>Loading..</p>
            }
            <Playlists user={user} />
      </div>

    </>
  )
}

export default Player