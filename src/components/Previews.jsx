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
import api from "../api";
import { ContactsOutlined } from '@material-ui/icons';

const Previews = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [videos] = useContext(VideoContext)
  const { ppl, tl, perl, sl } = useContext(PlaylistContext);
  const [playedList, setPlayedList] = ppl;
  const [temporaryPlaylist, setTemporaryPlaylist] = tl
  const [permanentPlaylists, setPermanentPlaylists] = perl
  const [selectedListIndex, setSelectedListIndex] = sl
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
    console.log(permanentPlaylists)
    const newVideo = {
      _id: video._id,
      title: video.title
    }
    const dbEntry = {
      video_id: video._id
    }
    if (decToken && decToken.id) {
      const backupPP = [...permanentPlaylists]
      let newPP = [...permanentPlaylists]
      let playlistToAddTo = newPP[selectedListIndex]
      if (playlistToAddTo.video_list.some(video => video.title === newVideo.title)) return
      playlistToAddTo.video_list.push(newVideo)
      newPP[selectedListIndex] = playlistToAddTo
      setPermanentPlaylists(newPP)
      api.addVideoToPlaylist(decToken.id, playlistToAddTo._id, dbEntry) 
      // failsafe in case something goes wrong
      .catch(err => {
          console.log(err)
          setPermanentPlaylists(backupPP)
        }) 
    } else {
      if (!temporaryPlaylist.some(video => video.title === newVideo.title)) {
        setTemporaryPlaylist(prev => [...prev, newVideo])
      }
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
                  style={{ position: "absolute", right: "0", bottom: "10px", height: "50px", width: "50px" }}
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
