import { Button, Image } from "react-bootstrap"
import api from "../api"
import '../App.css'

const AdminRequestInspector = ({ inspectData, inspectType, setInspecting }) => {
  console.log(inspectData)
  console.log(inspectType)
  const { _id, req_date, user_id } = inspectData
  const goWayBack = () => setInspecting(false)
  const promoteUser = () => {
    api.promoteUser(user_id._id)
      .then(() => alert("User has been successfully promoted"))
      .catch(err => console.log(err))
  }
  const deleteRequest = () => {
    api.deleteRequest(_id)
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <h2 style={{ textAlign: "center" }}>Request type</h2> {/* placeholder */}
        <span><b>Request ID</b>: {_id}</span><br />
        <span><b>Issued at</b>: {req_date}</span><br />
        <h3 style={{ textAlign: "center" }}><b>Issued by</b>:</h3><br />
        <div className="img-container" style={{ float: "right", margin: "5px" }}>
          <Image src={user_id.user_img_url} style={{ maxWidth: "80px" }}></Image>
        </div>
        <span><b>User Name</b>: {user_id.user_name}</span><br />
        <span><b>Real Name</b>: {user_id.first_name} {user_id.last_name}</span><br />
        <span><b>User ID</b>: {user_id._id}</span><br />
        <br />
        <span><b>Email Address</b>: {user_id.email}</span><br />
        <span><b>Phone Number</b>: {user_id.phone}</span><br />
        <span><b>Postal Address</b>: {user_id.street} {user_id.house_nr}{(user_id.street || user_id.house_nr) && (user_id.city_code || user_id.city_name) && ","} {user_id.city_code} {user_id.city_name}</span><br />
        <span><b>Country</b>: {user_id.country}</span><br />
        <br />
        <span><b>Company</b>: {user_id.company}</span><br />
        <br />
        <span><b>Registered since</b>: {user_id.reg_date}</span><br />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", padding: "5px" }}>
        <Button variant="primary" type="button" style={{ margin: "5px" }} onClick={() => {promoteUser();deleteRequest()}}>
          Grant request
        </Button>
        <Button variant="primary" type="button" style={{ margin: "5px" }} onClick={deleteRequest}>
          Deny request
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

export default AdminRequestInspector