import '../../App.css'
import Table from 'react-bootstrap/Table'

const AdminRequestList = ({requests, sortByDate, seeSingleRequest}) => {

  return (
    <div className="request-panel">
      <h2 style={{ textAlign: "center", fontFamily: "cursive", color: "white" }}><b>Requests</b></h2>
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