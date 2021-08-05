import { useState, useEffect, useContext } from "react";
import { Button, Image, Nav } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";
import { PlaylistContext } from "../context/PlaylistContext";
import moon_image from "../images/moon2.png"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TemporaryPlaylist = () => {
  const [videos] = useContext(VideoContext);
  const { ppl, tl } = useContext(PlaylistContext);
  const [playedList, setPlayedList] = ppl;
  const [temporaryPlaylist, setTemporaryPlaylist] = tl
  const [selected, setSelected] = useState(null)
  const [dropdownList, setDropdownList] = useState([])

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
    if (selected !== null && !temporaryPlaylist.includes(selected)) {
      setTemporaryPlaylist(prev => [...prev, selected])
    }
    else {
      alert("Video already in playlist")
    }
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
    console.log(temporaryPlaylist)
    let onlyIdPlaylist = []
    temporaryPlaylist.forEach(video => onlyIdPlaylist.push(video._id))
    setPlayedList(onlyIdPlaylist)
  }

  const playSingleVideo = (id) => setPlayedList([id])

  const removeVideo = (id) => {
    const newTP = temporaryPlaylist.filter(video => video._id !== id)
    setTemporaryPlaylist(newTP)
  }

  return (
    <div className="playlists-container">
      <div className="playlists">
        <h2 style={{ cursor: "pointer" }} onClick={playPlaylist}>
          <Nav.Link as={Link} to={temporaryPlaylist.length > 0 ? `/player/${temporaryPlaylist[0]._id}` : `#`}>
            <p style={{ fontSize: "30px", fontFamily: "serif", color: "yellow" }}><b>Temporary Playlist</b></p>
          </Nav.Link>
        </h2>
        <div style={{ textAlign: "left" }}>
          <DragDropContext>
            <Droppable droppableId="temp-playlist">
              {(provided, snapshot) => (
                <ul ref={provided.innerRef}>
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
                            variant="dark"
                            onClick={() => { removeVideo(listVideo._id); }}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      );
                    }
                  )}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="moon-image">
        <Image src={moon_image} alt="moon"></Image>
      </div>
    </div>
  )
}

export default TemporaryPlaylist