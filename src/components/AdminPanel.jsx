import AdminUserlist from './AdminUserlist'
import AdminRequestList from './AdminRequestList'
import UserInspector from './UserInspector'
import RequestInspector from './RequestInspector'
import '../App.css'
import { useState } from 'react'

const AdminPanel = () => {
  const [inspecting, setInspecting] = useState(false);
  const [inspectData, setInspectData] = useState({})
  const [inspectType, setInspectType] = useState("")

  return (
    <div className="admin-panel">
      {!inspecting ?
        <>
          <AdminUserlist
            setInspecting={setInspecting}
            setInspectData={setInspectData}
            setInspectType={setInspectType}
          />
          <AdminRequestList
            setInspecting={setInspecting}
            setInspectData={setInspectData}
            setInspectType={setInspectType}
          />
        </>
        : inspectType === "User" ? 
        <UserInspector 
        inspectData={inspectData} 
        setInspecting={setInspecting}
        setInspectData={setInspectData}
        /> :
        <RequestInspector 
        inspectData={inspectData} 
        setInspecting={setInspecting}
        setInspectData={setInspectData}
        />
      }
    </div>
  )
}

export default AdminPanel