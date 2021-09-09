import '../App.css'
import Table from 'react-bootstrap/Table'

const AdminVideoList = ({ videos, seeSingleVideo }) => {

  return (
    <div className="video-panel">
      <h2 style={{ textAlign: "center", fontFamily: "cursive", color: "white" }}><b>Videos</b></h2>
      <h3 style={{ fontFamily: "cursive", color: "yellow" }}>sorted by reports</h3>
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
            {videos
              .sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0)
              .sort((a, b) => b.reports - a.reports)
              .map((video, index) =>
                <tr onClick={() => seeSingleVideo(video)} style={{ cursor: "pointer" }} key={index}>
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