import { useContext, useState } from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import { Card, NavItem, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlaylistContext } from '../context/PlaylistContext';
import useBreakpoint from '../customHooks/useBreakpoint';
import { useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Previews = () => {
  const [videos] = useContext(VideoContext)
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)
  const point = useBreakpoint();
  const [margin, setMargin] = useState(1)
  const [loadingVideos, setLoadingVideos] = useState(true)

  useEffect(() => {
    const margin = point === "xl" ? 20 : point === "lg" ? 10 : point === "md" ? 5 : 0
    setMargin(margin)
  }, [point])

  const playPlaylist = () => {
    const autoPlay = []
    videos.forEach(video => autoPlay.push(video._id))
    setAutoPlaylist(autoPlay)
  }

  return (
    <div className="previews-container">
      <Droppable droppableId="previews">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {videos ? videos.map((video, index) => {
              <Draggable draggableId={video._id} key={video._id} index={index}>
                <Card
                  key={index}
                  style={{ background: "rgba(0,0,0,0.1)", margin: `${margin}px` }}
                  text="white"
                  className="previews-card-container"
                  onClick={() => playPlaylist()}
                >
                  <Link to={`/player/${video._id}`} draggable="false">
                    <img variant="top" src={video.video_img_url} height="140px" width="100%" />
                  </Link>
                  <Card.Body style={{ textAlign: "left" }}>
                    <Card.Title style={{ fontFamily: "cursive" }}>{video.title}</Card.Title>
                    <Card.Text >{video.artist}</Card.Text>
                  </Card.Body>
                </Card>
              </Draggable>
            }) :
              <div>
                <p>Loading....</p>
                <Spinner animation="border" variant="light" />
              </div>
            }
          </div>
        )}
      </Droppable>
    </div >
  )
}

export default Previews
