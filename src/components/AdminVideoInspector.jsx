import { Button, Image, Nav } from "react-bootstrap"
import api from "../api"
import '../App.css'
import { Link } from "react-router-dom"

const AdminVideoInspector = ({ inspectData, inspectType, setInspecting }) => {
  const { _id, adding_date, artist, duration, languages, reportedBy, reports, tags, title, uploader_id, video_img_url, video_url } = inspectData
  const goWayBack = () => setInspecting(false)
  const deleteVideo = () => {
    const uploader = uploader_id ? uploader_id._id : null
    api.deleteUploaderVideo(uploader, _id)
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div style={{ textAlign: "left", color: "rgba(210, 215, 211, 1)"}}>
        <div className="img-container" style={{ float: "right", margin: "5px" }}>
          <Image src={video_img_url} style={{ maxWidth: "80px" }}></Image>
        </div>
        <Nav.Link as={Link} to={`/player/${_id}`}>
          <h2 style={{ textAlign: "center", color: "antiquewhite", fontFamily: "cursive", textDecoration: "underline" }}>
            {title}
          </h2>
        </Nav.Link> {/* placeholder */}
        <span><b>Artist</b>: {artist}</span><br />
        <span><b>URL</b>: {video_url}</span><br />
        <span><b>Languages</b>: {languages.join(", ")}</span><br />
        <span><b>Tags</b>: {tags}</span><br />
        <span><b>Duration</b>: {`${Math.floor(duration / 60)}${duration % 60 < 10 ? ":0" : ":"}${Math.floor(duration % 60)}`}</span><br />
        <span><b>Video ID</b>: {_id}</span><br />
        <span><b>Reports</b>: {reports}</span><br />
        <span><b>Uploaded at</b>: {adding_date}</span><br />
        {uploader_id ?
          <>
            <span><b>Uploaded by</b>: {uploader_id.user_name}</span><br />
          </>
          : <p>No Uploader data available</p>
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", padding: "5px" }}>
        <Button variant="outline-light" type="button" style={{ margin: "5px" }} onClick={deleteVideo}>
          Delete
        </Button>
        <Button
          variant="outline-light"
          type="button"
          onClick={goWayBack}
          style={{ margin: "5px" }}
        >
          Back to admin panel
        </Button>
      </div>
    </div>
  )
}

export default AdminVideoInspector