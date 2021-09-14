import { useContext, useState, useEffect } from 'react'
import '../../App.css'
import api from "../../api";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md"
import { PlaylistContext } from '../../context/PlaylistContext';
import { UserContext } from '../../context/UserContext';
import { VideoContext } from '../../context/VideoContext'
import useBreakpoint from '../../customHooks/useBreakpoint';

const Previews = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [videos] = useContext(VideoContext)
  const { tl, perl, sl } = useContext(PlaylistContext);
  const [temporaryPlaylist, setTemporaryPlaylist] = tl
  const [permanentPlaylists, setPermanentPlaylists] = perl
  const [selectedListIndex] = sl
  const point = useBreakpoint();
  const [margin, setMargin] = useState(1)

  useEffect(() => {
    const margin = point === "xl" ? 20 : point === "lg" ? 10 : point === "md" ? 5 : 0
    setMargin(margin)
  }, [point])

  const addToPlaylist = video => {
    const newVideo = {
      _id: video._id,
      title: video.title
    }
    const dbEntry = {
      video_id: video._id
    }
    if (decToken && decToken.id) {
      if (permanentPlaylists.length === 0) return
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
      {videos.map((video, index) => {
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
                  alt={`play ${video.title}`}
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
                className="btneffect"
                variant="dark"
                onClick={() => addToPlaylist(video)}
                style={{ position: "absolute", right: "0", bottom: "10px", height: "50px", width: "50px" }}
              >
                <MdPlaylistAdd />
              </Button>
            </Card>
          </div>
        )
      })}
    </div >
  )
}

export default Previews