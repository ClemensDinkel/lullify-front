import { useState, useEffect, useContext } from "react";
import { Form, FormControl, Button, Image } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";
import { PlaylistContext } from "../context/PlaylistContext";
import moon_image from "../images/moon.png"

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
    console.log(temporaryPlaylist)
    localStorage.setItem("lullifyPlaylist", JSON.stringify(temporaryPlaylist))
  }, [temporaryPlaylist])

  const selectVideo = (e) => {
    e.preventDefault()
    const video = videos.find(video => video._id === e.target.value)
    const onlyIdAndName = {_id: video._id, title: video.title }
    setSelected(onlyIdAndName)
  };

  const playPlaylist = () => {
    let onlyIdPlaylist = []
    temporaryPlaylist.forEach(video => onlyIdPlaylist.push(video._id))
    setAutoPlaylist(onlyIdPlaylist)
  }

  const playSingleVideo = (id) => setAutoPlaylist([id])

  return (
    <div>
      <div>
      <h2 style={{ cursor: "pointer",fontFamily: "cursive", color:"yellow" }} onClick={playPlaylist}>
        <Link to={`/player/${temporaryPlaylist.length > 0 ? temporaryPlaylist[0]._id : ""}`}>
          Temporary Playlist
        </Link>
      </h2>
      <div style={{ textAlign: "left" }}>
        <ul>
          {temporaryPlaylist.map(
            (listVideo, listVideoIndex) => {
              return (
                <li key={listVideoIndex} onClick={() => playSingleVideo(listVideo._id)}>
                  <Link to={`/player/${listVideo._id}`}>
                    <p style={{color: "white"}}>{listVideo.title}</p>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
      <div>
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
        <Form className="d-flex">
          <Button
            type="submit"
            variant="outline-secondary"
            onClick={addVideo}
          >
            <AiOutlinePlus />
          </Button>
        </Form>
      </div>
    </div>

    <div >
      <Image src={moon_image} alt="moon"></Image>
    </div>
    </div>
  )
}

export default TemporaryPlaylist