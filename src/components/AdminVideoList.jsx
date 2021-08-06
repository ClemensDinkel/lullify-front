import { useContext, useEffect} from 'react'
import '../App.css'
import { VideoContext } from '../context/VideoContext'
import Table from 'react-bootstrap/Table'
import { QueryContext } from '../context/QueryContext'
import api from '../api'

const AdminVideoList = ({ setInspecting, setInspectData, setInspectType }) => {
  const { ft, lg } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [lang, setLang] = lg
  const [videos, setVideos] = useContext(VideoContext)
  
  const seeSingleVideo = (videoData) => {
    setInspecting(true);
    setInspectData(videoData);
    setInspectType("Video")
  }

  useEffect(() => {
    setFilter("")
    setLang("")
    api.getAllVideos()
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="video-panel">
      <h2 style={{ textAlign: "center", fontFamily: "cursive", color:"white" }}><b>Videos</b></h2>
      <h3 style={{fontFamily: "cursive", color:"yellow"}}>sorted by reports</h3>
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