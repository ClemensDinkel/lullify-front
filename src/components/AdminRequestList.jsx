import { useState, useEffect } from "react"
import api from "../api"
import '../App.css'
import Table from 'react-bootstrap/Table'

const AdminRequestList = ({ setInspecting, setInspectData, setInspectType }) => {
  const [requests, setRequests] = useState([])

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
      <h2 style={{ textAlign: "center" }}>Requests</h2>
      <h3>Content creator promotion</h3>
      <Table striped bordered hover variant="dark" size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Issued at</th>
            <th>User name</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) =>
            <tr onClick={() => seeSingleRequest(request)} style={{cursor: "pointer"}}>
              <td>{index + 1}</td>
              <td>{request.req_date}</td>
              <td>{request.user_id ? request.user_id.user_name : ""}</td>
              <td>{request.user_id ? request.user_id.company : ""}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3>Feature request</h3>

    </div>
  )
}

export default AdminRequestList