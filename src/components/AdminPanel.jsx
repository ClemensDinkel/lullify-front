import AdminRequestList from './AdminRequestList'
import AdminUserList from './AdminUserList'
import AdminVideoList from './AdminVideoList'
import AdminUserInspector from './AdminUserInspector'
import AdminRequestInspector from './AdminRequestInspector'
import AdminVideoInspector from './AdminVideoInspector'
import '../App.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import api from "../api"

const AdminPanel = () => {
  const { dTk } = useContext(UserContext)
  const [inspecting, setInspecting] = useState(false);
  const [inspectData, setInspectData] = useState({})
  const [inspectType, setInspectType] = useState("")
  const [users, setUsers] = useState([])
  const [creators, setCreators] = useState([])
  const [admins, setAdmins] = useState([])
  const [usersLoaded, setUsersLoaded] = useState(false)
  
  const fetchAndProcessUsers = () => {
    setUsersLoaded(false)
    api.getAllUsers()
      .then(res => {
        const users = res.data
        setUsersLoaded(true)
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

    <div className="admin-panel main-container" >
      {(dTk && dTk[0]) && dTk[0].role === "admin" ?
        !inspecting ?
          <>
            <AdminUserList
              setInspecting={setInspecting}
              setInspectData={setInspectData}
              setInspectType={setInspectType}
              users={users}
              usersLoaded={usersLoaded}
            />
            <AdminRequestList
              setInspecting={setInspecting}
              setInspectData={setInspectData}
              setInspectType={setInspectType}
            />
            <AdminVideoList
              setInspecting={setInspecting}
              setInspectData={setInspectData}
              setInspectType={setInspectType}
            />
          </>
          : inspectType === "User" ?
            <AdminUserInspector
              inspectData={inspectData}
              setInspecting={setInspecting}
              setInspectData={setInspectData}
            /> : inspectType === "Request" ?
              <AdminRequestInspector
                inspectData={inspectData}
                setInspecting={setInspecting}
                setInspectData={setInspectData}
              /> :
              <AdminVideoInspector
                inspectData={inspectData}
                setInspecting={setInspecting}
                setInspectData={setInspectData}
              />
        : <p>Access denied</p>
      }
    </div >

  )
}

export default AdminPanel