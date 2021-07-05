import { useState, useEffect, useContext } from "react";
import { Form, FormControl, Button, Image, Nav } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";
import { PlaylistContext } from "../context/PlaylistContext";
import moon_image from "../images/moon2.png"

const TemporaryPlaylist = () => {
  const [videos] = useContext(VideoContext);
  const [temporaryPlaylist, setTemporaryPlaylist] = useState([])
  const [selected, setSelected] = useState(null)
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)

  // load from local storage on first render
  useEffect(() => {
    if (localStorage.getItem('lullifyPlaylist') !== null) {
      setTemporaryPlaylist(JSON.parse(localStorage.getItem('lullifyPlaylist')))
    }
  }, [])
  // add video to temporary playlist
  const addVideo = (e) => {
    e.preventDefault()
    if (selected !== null && !temporaryPlaylist.includes(selected)) {
      setTemporaryPlaylist(prev => [...prev, selected])
    }
  }
  // update local storage as well
  useEffect(() => {
    localStorage.setItem("lullifyPlaylist", JSON.stringify(temporaryPlaylist))
  }, [temporaryPlaylist])

  const selectVideo = (e) => {
    e.preventDefault()
    const video = videos.find(video => video._id === e.target.value)
    const onlyIdAndName = { _id: video._id, title: video.title }
    setSelected(onlyIdAndName)
  };

  const playPlaylist = () => {
    let onlyIdPlaylist = []
    temporaryPlaylist.forEach(video => onlyIdPlaylist.push(video._id))
    setAutoPlaylist(onlyIdPlaylist)
  }

  const playSingleVideo = (id) => setAutoPlaylist([id])

  return (
    <div className="playlists-container">
      <div className="playlists">
        <h2 style={{ cursor: "pointer" }} onClick={playPlaylist}>
          <Nav.Link as={Link} to={`/player/${temporaryPlaylist.length > 0 ? temporaryPlaylist[0]._id : ""}`}>
            <p style={{ fontFamily: "cursive", color: "yellow" }}>Temporary Playlist</p>
          </Nav.Link>
        </h2>
        <div style={{ textAlign: "left" }}>
          <ul>
            {temporaryPlaylist.map(
              (listVideo, listVideoIndex) => {
                return (
                  <li key={listVideoIndex} style={{ color: "antiquewhite" }} onClick={() => playSingleVideo(listVideo._id)}>
                    <Nav.Link to={`/player/${listVideo._id}`}>
                      <h6 style={{ color: "antiquewhite" }}>{listVideo.title}</h6>
                    </Nav.Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <div>
        <Form className="d-flex">
          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            name="video"
            value={videos._id}
            onChange={selectVideo}
            custom
          >
            <option value="">-----Add Video-----</option>
            {videos &&
              videos.map((video, videoIndex) => {
                return (
                  <option value={video._id} key={videoIndex}>
                    {video.title}
                  </option>
                );
              })}
          </Form.Control>
          
            <Button
              type="button"
              variant="outline-light"
              onClick={addVideo}
            >
              <AiOutlinePlus />
            </Button>
          </Form>
        </div>
      </div>

      <div className="moon-image">
        <Image src={moon_image} alt="moon"></Image>
      </div>
    </div>
  )
}

export default TemporaryPlaylist