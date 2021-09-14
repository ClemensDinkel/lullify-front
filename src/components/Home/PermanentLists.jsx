import { Button, Nav} from "react-bootstrap";
import { MdDelete, MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const PermanentLists = ({permanentPlaylists,playPlaylist, selectedListIndex, selectPlaylist, deletePlaylist, onDragEnd, playSingleVideo, removeVideo}) => {
  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        {permanentPlaylists.map((playlist, playlistIndex) => {
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <li
                  key={playlistIndex}
                  style={{ cursor: "pointer", color: "antiquewhite", width: "80%", textAlign: "left" }}
                  onClick={() => playPlaylist(playlistIndex)}
                >
                  <Nav.Link as={Link} to={
                    playlist.video_list.length > 0
                      ? `/player/${playlist.video_list[0]._id}`
                      : "#"
                  }
                  >
                    <h5
                      style={{
                        color: "antiquewhite",
                        fontFamily: "cursive",
                        textDecoration: "underline"
                      }}
                    >
                      {playlist.name}
                    </h5>
                  </Nav.Link>
                </li>
                <div style={{ display: "flex" }}>
                  {permanentPlaylists.length > 1 &&
                    <Button
                      type="button"
                      variant={selectedListIndex === playlistIndex ? "success" : "dark"}
                      onClick={() => selectPlaylist(playlistIndex)}
                      style={{ maxHeight: "40px", marginLeft: "5px" }}
                    >
                      <MdPlaylistAdd />
                    </Button>
                  }
                  <Button
                    type="button"
                    style={{ maxHeight: "40px", marginLeft: "5px" }}
                    variant="dark"
                    onClick={(e) => {
                      window.confirm(
                        `Do you really want to delete ${playlist.name}?`
                      ) && deletePlaylist(playlist._id, playlistIndex);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>
              <div>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={`${playlistIndex}`}>
                    {(provided) => (
                      <ul ref={provided.innerRef}>
                        {playlist.video_list &&
                          playlist.video_list.map(
                            (listVideo, listVideoIndex) => {
                              return (
                                <Draggable draggableId={listVideo._id} key={listVideo._id} index={listVideoIndex}>
                                  {(provided) => (
                                    <div ref=
                                      {provided.innerRef}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}>
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
                                          onClick={() => { removeVideo(playlist._id, playlistIndex, listVideo._id, listVideoIndex); }}
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
          );
        })
        }
      </ul>
    </div>
  )
}

export default PermanentLists