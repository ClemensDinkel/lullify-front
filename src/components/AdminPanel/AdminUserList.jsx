import '../../App.css'
import {Table} from "react-bootstrap"

const AdminUserList = ({admins, creators, users, seeSingleUser }) => {

  return (
    <div className="user-list">
      <h2 style={{ textAlign: "center", fontFamily: "cursive", color: "white" }}><b>User List</b></h2>
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
                <tr onClick={() => seeSingleUser(admin)} style={{ cursor: "pointer" }} key={index}>
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
              <tr onClick={() => seeSingleUser(creator)} style={{ cursor: "pointer" }} key={index}>
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
              <tr onClick={() => seeSingleUser(user)} style={{ cursor: "pointer" }} key={index}>
                <td>{user.user_name}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminUserList