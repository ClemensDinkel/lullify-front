import { useContext } from "react";
import api from "../api";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";

const ContentList = ({ uploaderVideos, setUploaderVideos, decToken }) => {
  const [videos, setVideos] = useContext(VideoContext)

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
      <h3 style={{ fontFamily: "cursive", color: "white" }}>Content List</h3>
      <div style={{ margin: ".4rem" }}>
        <Table striped bordered hover variant="light" size="sm" responsive>
          <thead>
            <tr>
              <th style={{ width: "80%" }}>Title</th>
              <th style={{ width: "10%" }}>Edit</th>
              <th style={{ width: "10%" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {uploaderVideos &&
              uploaderVideos.map((uploaderVideo, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "left" }}>{uploaderVideo.title}</td>
                    <td>
                      <Link exact to={`/video/${uploaderVideo._id}`}>
                        <Button type="submit" variant="light">
                          <AiTwotoneEdit />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        type="submit"
                        variant="light"
                        onClick={() => {
                          window.confirm(
                            `Do you want to delete ${uploaderVideo.title}?`
                          ) &&
                            api
                              .deleteUploaderVideo(decToken.id, uploaderVideo._id)
                              .then(() => {
                                setUploaderVideos(prev =>
                                  prev.filter(video => video._id !== uploaderVideo._id))
                                setVideos(prev =>
                                  prev.filter(video => video._id !== uploaderVideo._id))
                              })
                              .catch(err => alert(err.message))
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ContentList;

{
  /* <Alert key={index} variant="secondary">
                  <div style={{ display: "flex", textAlign: "left"}}>
                    <div style={{width: "80%"}}>
                    <p>{uploaderVideo.title}</p>
                    </div>
                    <div style={{width: "20%"}}>
                    <Link exact to={`/video/${uploaderVideo._id}`}>
                    <Button type="submit" variant="outline-secondary">
                      <AiTwotoneEdit />
                    </Button>
                    </Link>
                    <Button type="submit" variant="outline-secondary"
                      onClick={(e) => {
                        api.deleteUploaderVideo(decToken.id, uploaderVideo._id)
                        .then((res) => {
                          alert(
                            `Do you want to delete ${uploaderVideo.title}?`
                          );
                          window.location.reload();
                          history.push(`/creator`);
                        });
                      }}
                    >
                      <MdDelete />
                    </Button>
                    </div>
                  </div>
                </Alert> */
}
