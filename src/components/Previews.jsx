import { useContext, useState } from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import { Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlaylistContext } from '../context/PlaylistContext';
import useBreakpoint from '../customHooks/useBreakpoint';
import { useEffect } from 'react';
import { MdPlaylistAdd } from "react-icons/md"
import { UserContext } from '../context/UserContext';

const Previews = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [videos] = useContext(VideoContext)
  const { ppl, tl, perl } = useContext(PlaylistContext);
  const [playedList, setPlayedList] = ppl;
  const [temporaryPlaylist, setTemporaryPlaylist] = tl
  const [permanentPlaylists, setPermanentPlaylists] = perl
  const point = useBreakpoint();
  const [margin, setMargin] = useState(1)
  const [loadingVideos, setLoadingVideos] = useState(true)

  useEffect(() => {
    const margin = point === "xl" ? 20 : point === "lg" ? 10 : point === "md" ? 5 : 0
    setMargin(margin)
  }, [point])

  /* const playPlaylist = () => {
    const autoPlay = []
    videos.forEach(video => autoPlay.push(video._id))
    setPlayedList(autoPlay)
  } */

  const addToPlaylist = video => {
    console.log(video)
    if (decToken) {
      
    } else {
      const newVideo = {
        title: video.title,
        _id: video._id
      }
      console.log(newVideo)
      setTemporaryPlaylist(prev => [...prev, newVideo])
    }
  }

  return (
    <div className="previews-container">
      {
        videos ? videos.map((video, index) => {
          return (
            <div>
              <Card
                key={index}
                style={{ background: "rgba(0,0,0,0.1)", margin: `${margin}px`, height: "100%" }}
                text="white"
                className="previews-card-container"
              >
                <Link to={`/player/${video._id}`} draggable="false">
                  <img
                    variant="top"
                    src={video.video_img_url}
                    height="140px"
                    width="100%"
                    draggable="false"
                  />
                </Link>
                <Card.Body style={{ textAlign: "left" }}>
                  <Card.Title style={{ fontFamily: "cursive" }}>{video.title}</Card.Title>
                  <Card.Text >
                    {video.artist}
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="dark"
                  onClick={() => addToPlaylist(video)}
                  style={{ position: "absolute", right: "0", bottom: "10px", height: "50px", width: "50px", zIndex: "9999" }}
                >
                  <MdPlaylistAdd />
                </Button>
              </Card>
            </div>
          )
        }) :
          <div>
            <p>Loading....</p>
            <Spinner animation="border" variant="light" />
          </div>
      }
    </div >
  )
}

export default Previews
