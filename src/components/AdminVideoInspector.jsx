import { Button, Image } from "react-bootstrap"
import api from "../api"
import '../App.css'

const AdminVideoInspector = ({ inspectData, inspectType, setInspecting }) => {
  console.log(inspectData)
  console.log(inspectType)
  const { _id, adding_date, artist, duration, languages, reportedBy, reports, tags, title, uploader_id, video_img_url, video_url } = inspectData
  const goWayBack = () => setInspecting(false)
  const deleteVideo = () => {
    console.log(uploader_id._id)
    console.log(_id)
    api.deleteUploaderVideo(uploader_id._id, _id)
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <div className="img-container" style={{ float: "right", margin: "5px" }}>
          <Image src={video_img_url} style={{ maxWidth: "80px" }}></Image>
        </div>
        <h2 style={{ textAlign: "center" }}>{title}</h2> {/* placeholder */}
        <span><b>Artist</b>: {artist}</span><br />
        <span><b>URL</b>: {video_url}</span><br />
        <span><b>Languages</b>: {languages.join(", ")}</span><br />
        <span><b>Tags</b>: {tags.join(", ")}</span><br />
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
        <Button variant="primary" type="button" style={{ margin: "5px" }} onClick={deleteVideo}>
          Delete
        </Button>
        <Button
          variant="primary"
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