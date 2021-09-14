import AdminRequestList from './AdminRequestList'
import AdminUserList from './AdminUserList'
import AdminVideoList from './AdminVideoList'
import AdminUserInspector from './AdminUserInspector'
import AdminRequestInspector from './AdminRequestInspector'
import AdminVideoInspector from './AdminVideoInspector'
import '../../App.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { QueryContext } from '../../context/QueryContext'
import { VideoContext } from '../../context/VideoContext'
import api from "../../api"
import LoadingSpinner from '../LoadingSpinner'

const AdminPanel = () => {
  const { dTk } = useContext(UserContext)
  const [inspecting, setInspecting] = useState(false);
  const [inspectData, setInspectData] = useState({})
  const [inspectType, setInspectType] = useState("")
  
  const [users, setUsers] = useState([])
  const [creators, setCreators] = useState([])
  const [admins, setAdmins] = useState([])
  const [requests, setRequests] = useState([])

  const [usersLoaded, setUsersLoaded] = useState(false)
  const [requestsLoaded, setRequestsLoaded] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState(false)
  
  const { ft, lg } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [lang, setLang] = lg
  const [videos, setVideos] = useContext(VideoContext)
  // users

  useEffect(() => {
    fetchAndProcessUsers();
    fetchRequests();
    fetchVideos();
  }, [])

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

  // requests

  const sortByDate = (a, b) => b.req_date < a.req_date ? -1 : b.req_date > a.req_date ? 1 : 0;

  const seeSingleRequest = (requestData) => {
    setInspecting(true);
    setInspectData(requestData);
    setInspectType("Request");
  }

  const fetchRequests = () => {
    setRequestsLoaded(false)
    api.getAllRequests()
      .then(res => {
        setRequestsLoaded(true)
        setRequests(res.data);
      });
  }

  // videos
  
  const seeSingleVideo = (videoData) => {
    setInspecting(true);
    setInspectData(videoData);
    setInspectType("Video")
  }

  const fetchVideos = () => {
    setFilter("")
    setLang("")
    setVideosLoaded(false)
    api.getAllVideos()
      .then(res => {
        setVideosLoaded(true)
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  }

  return (

    <div className="admin-panel main-container" >
      {(dTk && dTk[0]) && dTk[0].role === "admin" ?
        !inspecting ?
          usersLoaded && requestsLoaded && videosLoaded ?
            <>
              <AdminUserList
                admins={admins}
                creators={creators}
                users={users}
                seeSingleUser={seeSingleUser}
              />
              <AdminRequestList
                requests={requests}
                sortByDate={sortByDate}
                seeSingleRequest={seeSingleRequest}
              />
              <AdminVideoList
                videos={videos}
                seeSingleVideo={seeSingleVideo}
              />
            </> :
            <LoadingSpinner/>
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
        : <p style={{color: "white"}}>Access denied</p>
      }
    </div >

  )
}

export default AdminPanel