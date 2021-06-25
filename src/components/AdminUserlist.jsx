import { useState, useEffect } from "react"
import api from "../api"
import '../App.css'
import { Table } from "react-bootstrap"

const AdminUserList = ({ setInspecting, setInspectData, setInspectType }) => {
  const [users, setUsers] = useState([])
  const [creators, setCreators] = useState([])
  const [admins, setAdmins] = useState([])
  const fetchAndProcessUsers = () => {
    api.getAllUsers()
      .then(res => {
        const users = res.data
        setAdmins(users.filter(user => user.role === "admin").sort())
        setCreators(users.filter(user => user.role === "content_creator").sort())
        setUsers(users.filter(user => user.role === "user").sort())
      })
      .catch(err => console.log(err))
  }

  const seeSingleUser = (userData) => {
    setInspecting(true);
    setInspectData(userData);
    setInspectType("User")
  }

  useEffect(() => {
    fetchAndProcessUsers();
  }, [])

  return (
    <div className="user-list">
      <h2 style={{ textAlign: "center" }}>User List</h2>
      <h3>Admins</h3>
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
              <tr onClick={() => seeSingleUser(admin)} style={{cursor: "pointer"}}>
                <td>{admin.user_name}</td>
                <td>{admin.first_name}</td>
                <td>{admin.last_name}</td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
      <h3>Content Creators</h3>
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
            <tr onClick={() => seeSingleUser(creator)} style={{cursor: "pointer"}}>
              <td>{creator.user_name}</td>
              <td>{creator.first_name}</td>
              <td>{creator.last_name}</td>
              <td>{creator.company}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3>Users</h3>
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
            <tr onClick={() => seeSingleUser(user)} style={{cursor: "pointer"}}>
              <td>{user.user_name}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminUserList