import { useState, useEffect, useContext } from "react";
import { Form, FormControl, Button, Image, Nav } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";
import { PlaylistContext } from "../context/PlaylistContext";
import moon_image from "../images/moon2.png"
import { DnDContext } from "../context/DnDContext";


const TemporaryPlaylist = () => {
  const [videos] = useContext(VideoContext);
  const [temporaryPlaylist, setTemporaryPlaylist] = useState([])
  const [selected, setSelected] = useState(null)
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)
  const [dropdownList, setDropdownList] = useState([])
  const [draggedItem, setDraggedItem] = useContext(DnDContext) || [] // It's an object later, but clicking on a preview to play the video seems to trigger this as well (with whatever is behing ||) and complains about it not being iterable - so setting this to an array by default is a workaround

  // sort videos in dropdown without sorting videos in previews
  useEffect(() => {
    let videosCopy = videos.slice()
    setDropdownList([...videosCopy.sort((a, b) => a.title.localeCompare(b.title))])
  }, [videos])

  // load from local storage on first render
  useEffect(() => {
    if (sessionStorage.getItem('lullifyPlaylist') !== null) {
      setTemporaryPlaylist(JSON.parse(sessionStorage.getItem('lullifyPlaylist')))
    }
  }, [])

  // add video to temporary playlist
  const addVideo = (e) => {
    e.preventDefault()
    if (selected !== null && !temporaryPlaylist.some(video => video.title === selected.title)) {
      setTemporaryPlaylist(prev => [...prev, selected])
    }
    else alert("Video already in playlist")
  }

  // update local storage as well
  useEffect(() => {
    sessionStorage.setItem("lullifyPlaylist", JSON.stringify(temporaryPlaylist))
  }, [temporaryPlaylist])

  const selectVideo = (e) => {
    e.preventDefault()
    const video = videos.find(video => video._id === e.target.value)
    const onlyIdAndName = { _id: video._id, title: video.title }
    setSelected(onlyIdAndName)
  };

  const playPlaylist = () => {
    let onlyIdPlaylist = []
    console.log(temporaryPlaylist.length)
    temporaryPlaylist.forEach(video => onlyIdPlaylist.push(video._id))
    setAutoPlaylist(onlyIdPlaylist)
  }

  const playSingleVideo = (id) => setAutoPlaylist([id])

  const removeVideo = (id) => {
    const newTP = temporaryPlaylist.filter(video => video._id !== id)
    setTemporaryPlaylist(newTP)
  }

  // adding, moving and removing using drag n drop

  const onDrop = e => {
    e.preventDefault();
    console.log("dropping")
    console.log(draggedItem.title)
    console.log(e.target.id)
    console.log(e.currentTarget.id)
    const targetIndex = e.currentTarget.id
    const newVideo = {
      title: draggedItem.title,
      _id: draggedItem._id
    }
    let playlistCopy = temporaryPlaylist.slice();
    console.log(playlistCopy)
    playlistCopy = playlistCopy.filter(video => video.title !== newVideo.title)
    playlistCopy.splice(targetIndex, 0, newVideo)
    console.log(playlistCopy)
    setTemporaryPlaylist(playlistCopy)
  }

  const append = () => {
    if (!temporaryPlaylist.some(video => video.title === draggedItem.title)) {
      const newVideo = {
        title: draggedItem.title,
        _id: draggedItem._id
      }
      setTemporaryPlaylist(prev => [...prev, newVideo])
    } else alert("Video already in playlist")
  }

  return (
    <div className="playlists-container">
      <div className="playlists">
        <div id="temp-playlist"
        style={{ cursor: "pointer" }}
        onClick={playPlaylist}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={append}
        >
          <h2>
            <Nav.Link as={Link} to={temporaryPlaylist.length > 0 ? `/player/${temporaryPlaylist[0]._id}` : `#`}>
              <p style={{ fontSize: "30px", fontFamily: "serif", color: "yellow" }}>
                <b>Temporary Playlist</b> {/* e.target seems to be the innermost node, so target is the <b> tag</b>*/}
              </p>
            </Nav.Link>
          </h2>
        </div>
        <div style={{ textAlign: "left" }}>
          <ul>
            {temporaryPlaylist.map(
              (listVideo, listVideoIndex) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%"
                    }}
                  >
                    <li
                      id={listVideoIndex}
                      key={listVideoIndex}
                      style={{
                        color: "antiquewhite",
                        display: "flex",
                        flexWrap: "wrap",
                        width: "80%",
                        textAlign: "left"
                      }}
                      onClick={() =>
                        playSingleVideo(listVideo._id)
                      }
                      onDragOver={e => {
                        e.preventDefault();
                        console.log(e.currentTarget)
                      }}
                      onDrop={onDrop}
                    >
                      <Nav.Link
                        as={Link}
                        to={`/player/${listVideo._id}`}
                      >
                        <h6 style={{ color: "antiquewhite" }}>
                          {listVideo.title}
                        </h6>
                      </Nav.Link>
                    </li>
                    <Button
                      type="button"
                      style={{ maxHeight: "40px" }}
                      variant="outline-light"
                      onClick={() => { removeVideo(listVideo._id); }}
                    >
                      <MdDelete />
                    </Button>
                  </div>
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
              {dropdownList &&
                dropdownList
                  .map((video, videoIndex) => {
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