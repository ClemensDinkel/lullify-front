import { useState, useEffect } from "react"
import api from "../api"

const Userlist = () => {
  const [users, setUsers] = useState([])
  const [creator, setcreators] = useState([])
  const [admins, setAdmins] = useState([])

  const processData = (data) => {
    console.log(data)
  }

  useEffect(() => {
    api.getAllUsers()
      .then(res => processData(res.data))
  },[])

  return (
    <>
      Userlist
    </>
  )
}

export default Userlist