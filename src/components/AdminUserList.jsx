import '../App.css'
import { Table, Spinner } from "react-bootstrap"

const AdminUserList = ({ setInspecting, setInspectData, setInspectType, admins, creators, users, usersLoaded, seeSingleUser}) => {
  
  return (
    <div className="user-list">
      <h2 style={{ textAlign: "center", fontFamily: "cursive", color: "white" }}><b>User List</b></h2>
      {usersLoaded ?
        <div>
          <h3 style={{ fontFamily: "cursive", color: "yellow" }}>Admins</h3>
          <div style={{ overflowY: "scroll", maxHeight: "26vh" }}>
            <Table striped bordered hover variant="dark" size="sm" responsive>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>First name</th>
                  <th>Last name</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) =>
                  <>
                    <tr onClick={() => seeSingleUser(admin)} style={{ cursor: "pointer" }}>
                      <td>{admin.user_name}</td>
                      <td>{admin.first_name}</td>
                      <td>{admin.last_name}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </div>

          <h3 style={{ fontFamily: "cursive", color: "yellow" }}>Content Creators</h3>
          <div style={{ overflowY: "scroll", maxHeight: "26vh" }}>
            <Table striped bordered hover variant="dark" size="sm" responsive>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {creators.map((creator, index) =>
                  <tr onClick={() => seeSingleUser(creator)} style={{ cursor: "pointer" }}>
                    <td>{creator.user_name}</td>
                    <td>{creator.first_name}</td>
                    <td>{creator.last_name}</td>
                    <td>{creator.company}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <h3 style={{ fontFamily: "cursive", color: "yellow" }}>Users</h3>
          <div style={{ overflowY: "scroll", maxHeight: "26vh" }}>
            <Table striped bordered hover variant="dark" size="sm" responsive>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>First name</th>
                  <th>Last name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) =>
                  <tr onClick={() => seeSingleUser(user)} style={{ cursor: "pointer" }}>
                    <td>{user.user_name}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div> :
        <div>
        <Spinner animation="border" role="status" variant="light" style={{height: "60px", width: "60px"}}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      }
    </div>
  )
}

export default AdminUserList