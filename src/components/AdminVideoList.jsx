import { useContext } from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import Table from 'react-bootstrap/Table'


const AdminVideoList = ({ setInspecting, setInspectData, setInspectType }) => {
  const [videos] = useContext(VideoContext)
  console.log(videos)
  const seeSingleVideo = (videoData) => {
    setInspecting(true);
    setInspectData(videoData);
    setInspectType("Video")
  }

  return (
    <div className="video-panel">
      <h2 style={{ textAlign: "center" }}>Videos</h2>
      <h3>sorted by reports</h3>
      <div style={{ overflowY: "scroll", maxHeight: "78vh" }}>
        <Table striped bordered hover variant="dark" size="sm" responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Uploader</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {videos.sort((a, b) => b.reports - a.reports).map((video, index) =>
              <tr onClick={() => seeSingleVideo(video)} style={{ cursor: "pointer" }}>
                <td>{video.title}</td>
                <td>{video.artist}</td>
                <td>{video.uploader_id && video.uploader_id.user_name}</td> {/* remove check later ?*/}
                <td>{video.reports}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminVideoList