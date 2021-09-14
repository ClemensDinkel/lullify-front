import { Button, Nav } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TemporaryList = ({onDragEnd, temporaryPlaylist, playSingleVideo, removeVideo}) => {
  return (
    <div>
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
  )
}
export default TemporaryList