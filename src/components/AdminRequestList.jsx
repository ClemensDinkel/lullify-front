import { useState, useEffect } from "react"
import api from "../api"
import '../App.css'
import Table from 'react-bootstrap/Table'

const AdminRequestList = ({ setInspecting, setInspectData, setInspectType }) => {
  const [requests, setRequests] = useState([])

  const sortByDate = (a, b) => b.req_date < a.req_date ? -1 : b.req_date > a.req_date ? 1 : 0;

  const seeSingleRequest = (requestData) => {
    setInspecting(true);
    setInspectData(requestData);
    setInspectType("Request")
  }

  useEffect(() => {
    api.getAllRequests()
      .then(res => setRequests(res.data));
  }, [])
  console.log(requests)

  return (
    <div className="request-panel">
      <h2 style={{ textAlign: "center", fontFamily: "cursive", color: "white" }}>Requests</h2>
      <h3 style={{fontFamily: "cursive", color:"yellow"}}>Content creator promotion</h3>
      <div style={{ overflowY: "scroll", maxHeight: "39vh" }}>
        <Table striped bordered hover variant="dark" size="sm" responsive>
          <thead>
            <tr>
              <th>Issued at</th>
              <th>User name</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {requests.sort(sortByDate).map((request, index) =>
              <tr onClick={() => seeSingleRequest(request)} style={{ cursor: "pointer" }}>
                <td>{request.req_date}</td>
                <td>{request.user_id ? request.user_id.user_name : ""}</td>
                <td>{request.user_id ? request.user_id.company : ""}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* <h3 style={{fontFamily: "cursive", color:"white"}}>Feature request</h3>
      <p style={{fontFamily: "cursive", color:"white"}}>tbd...</p> */}
    </div>
  )
}

export default AdminRequestList