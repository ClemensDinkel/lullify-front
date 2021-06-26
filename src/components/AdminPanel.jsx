import AdminRequestList from './AdminRequestList'
import AdminUserList from './AdminUserList'
import AdminVideoList from './AdminVideoList'
import AdminUserInspector from './AdminUserInspector'
import AdminRequestInspector from './AdminRequestInspector'
import AdminVideoInspector from './AdminVideoInspector'
import '../App.css'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'


const AdminPanel = () => {
  const { dTk } = useContext(UserContext)
  const [inspecting, setInspecting] = useState(false);
  const [inspectData, setInspectData] = useState({})
  const [inspectType, setInspectType] = useState("")
  return (
    <div div div className="admin-panel" >
      {(dTk && dTk[0]) && dTk[0].role === "admin" ?
        !inspecting ?
          <>
            <AdminUserList
              setInspecting={setInspecting}
              setInspectData={setInspectData}
              setInspectType={setInspectType}
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