import { useEffect, useContext } from "react";
import { Button, Image, Nav } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../context/PlaylistContext";
import moon_image from "../../images/moon2.png"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TemporaryPlaylist = () => {
  const { ppl, tl } = useContext(PlaylistContext);
  const [playedList, setPlayedList] = ppl;
  const [temporaryPlaylist, setTemporaryPlaylist] = tl

  // load from local storage on first render
  useEffect(() => {
    if (sessionStorage.getItem('lullifyPlaylist') !== null) {
      setTemporaryPlaylist(JSON.parse(sessionStorage.getItem('lullifyPlaylist')))
    }
  }, [])

  // update local storage as well
  useEffect(() => {
    sessionStorage.setItem("lullifyPlaylist", JSON.stringify(temporaryPlaylist))
  }, [temporaryPlaylist])

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

  // dnd operations

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const videosNew = reorder(
      temporaryPlaylist,
      result.source.index,
      result.destination.index
    );
    setTemporaryPlaylist(videosNew);
  }

  return (
    <div className="playlists-container">
      <div className="playlists">
        <h2 style={{ cursor: "pointer" }} onClick={playPlaylist}>
          <Nav.Link as={Link} to={temporaryPlaylist.length > 0 ? `/player/${temporaryPlaylist[0]._id}` : `#`}>
            <b style={{ fontSize: "30px", fontFamily: "cursive", color: "yellow" }}>Temporary Playlist</b>
          </Nav.Link>
        </h2>
        <div style={{ textAlign: "left" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="temp-playlist">
              {(provided) => (
                <ul ref={provided.innerRef}>
                  {temporaryPlaylist.map(
                    (listVideo, listVideoIndex) => {
                      return (
                        <Draggable draggableId={listVideo._id} key={listVideo._id} index={listVideoIndex}>
                          {(provided) => (
                            <div ref=
                              {provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}>
                              <div style={{
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
                                  onClick={() => playSingleVideo(listVideo._id)}
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
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="moon-image">
        <Image src={moon_image} alt="moon" style={{maxWidth: "200px"}}></Image>
      </div>
    </div>
  )
}

export default TemporaryPlaylist