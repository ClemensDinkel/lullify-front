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

  const addVideo = (e) => {
    e.preventDefault()
    if (selected !== null && !temporaryPlaylist.includes(selected)) setTemporaryPlaylist(prev => [...prev, selected])
  }

  const selectVideo = (e) => {
    e.preventDefault()
    setSelected(videos.find(video => video._id === e.target.value))
  };

  const playPlaylist = () => {
    const sessionPlaylist = sessionStorage.getItem('lullifyPlaylist').split(', ')
    if (sessionPlaylist.length > 1) sessionPlaylist.pop() // removes last element with "" 
    setAutoPlaylist(sessionPlaylist)
  }

  useEffect(() => {
    //sessionStorage.clear();
    let concatStr = ""
    for (let i = 0; i < temporaryPlaylist.length; i++) {
      concatStr += `${temporaryPlaylist[i]._id}, `
    }
    sessionStorage.setItem('lullifyPlaylist', `${concatStr}`)
  }, [temporaryPlaylist])

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
                <li key={listVideoIndex} >
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