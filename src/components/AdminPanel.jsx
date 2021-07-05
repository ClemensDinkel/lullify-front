import AdminRequestList from './AdminRequestList'
import AdminUserList from './AdminUserList'
import AdminVideoList from './AdminVideoList'
import AdminUserInspector from './AdminUserInspector'
import AdminRequestInspector from './AdminRequestInspector'
import AdminVideoInspector from './AdminVideoInspector'
import '../App.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { VideoContext } from '../context/VideoContext'
import { QueryContext } from '../context/QueryContext'
import api from '../api'

const AdminPanel = () => {
  const { dTk } = useContext(UserContext)
  const [inspecting, setInspecting] = useState(false);
  const [inspectData, setInspectData] = useState({})
  const [inspectType, setInspectType] = useState("")
  const { ft } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [videos, setVideos] = useContext(VideoContext)

  useEffect(() => {
    console.log("running new query on adminpanel")
    setFilter("")
    api.getVideos()
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
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