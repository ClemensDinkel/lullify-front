import { Button, Image } from "react-bootstrap"
import api from "../api"
import '../App.css'

const AdminUserInspector = ({ inspectData, setInspecting, setInspectData }) => {
  console.log(inspectData)
  const { user_img_url, user_name, first_name, last_name, _id, role, email, phone, street, house_nr, city_name, city_code, country, company, reg_date } = inspectData
  const goWayBack = () => setInspecting(false)
  const changeRole = (toRole) => {
    if (toRole === "user") {
      api.demoteUser(_id)
        .then(() => {
          alert("User has been successfully demoted")
          setInspectData(prev => {
            return { ...prev, role: toRole }
          })
        })
    }
    if (toRole === "content_creator") {
      api.promoteUser(_id)
        .then(() => {
          alert("User has been successfully promoted")
          setInspectData(prev => {
            return { ...prev, role: toRole }
          })
        })
    }
  }

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <div className="img-container" style={{ float: "right", margin: "5px" }}>
          <Image src={user_img_url} style={{ maxWidth: "80px" }}></Image>
        </div>
        <br />
        <h2 style={{ textAlign: "center" }}>{user_name}</h2>
        <br />
        <span><b>Real Name</b>: {first_name} {last_name}</span><br />
        <span><b>ID</b>: {_id}</span><br />
        <span><b>Role</b>: {role}</span><br />
        <br />
        <span><b>Email Address</b>: {email}</span><br />
        <span><b>Phone Number</b>: {phone}</span><br />
        <span><b>Postal Address</b>: {street} {house_nr}{(street || house_nr) && (city_code || city_name) && ","} {city_code} {city_name}</span><br />
        <span><b>Country</b>: {country}</span><br />
        <br />
        <span><b>Company</b>: {company}</span><br />
        <br />
        <span><b>Registered since</b>: {reg_date}</span><br />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", padding: "5px" }}>
        {inspectData.role === "user" &&
          <Button variant="primary" type="button" style={{ margin: "5px" }} onClick={() => changeRole("content_creator")}>
            Promote
          </Button>
        }
        {inspectData.role === "content_creator" &&
          <Button variant="primary" type="button" style={{ margin: "5px" }} onClick={() => changeRole("user")}>
            Demote
          </Button>
        }
        <Button variant="primary" type="button" onClick={goWayBack} style={{ margin: "5px" }}>
          Back to admin panel
        </Button>
      </div>
    </div>
  )
}

export default AdminUserInspector