import { useContext } from "react";
import api from "../../../api";
import { Table } from "react-bootstrap";
import { VideoContext } from "../../../context/VideoContext";
import VideoOptions from "./VideoOptions";

const ContentManager = ({ uploaderVideos, setUploaderVideos, decToken }) => {
  const [videos, setVideos] = useContext(VideoContext)

  const handleDelete = (uploaderVideo) => {
    window.confirm(`Do you want to delete ${uploaderVideo.title}?`) &&
      api
        .deleteUploaderVideo(decToken.id, uploaderVideo._id)
        .then(() => {
          setUploaderVideos(prev =>
            prev.filter(video => video._id !== uploaderVideo._id))
          setVideos(prev =>
            prev.filter(video => video._id !== uploaderVideo._id))
        })
        .catch(err => alert(err.message))
  }

  return (
    <div className="content-list">
      <h3 style={{ fontFamily: "cursive", color: "white" }}><b>Added Videos</b></h3>
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
              uploaderVideos.map((uploaderVideo, index) =>
                <VideoOptions 
                uploaderVideo={uploaderVideo}
                handleDelete={handleDelete} 
                key={index} />
              )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ContentManager;