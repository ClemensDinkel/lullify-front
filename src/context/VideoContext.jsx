import { useState, useEffect, createContext } from "react";
import api from "../api";

export const VideoContext = createContext()

export const VideoController = ({ children }) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    api.fetchVideos()
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  },[])

  return (
    <VideoContext.Provider value={[videos, setVideos]}>
      {children}
    </VideoContext.Provider>
  )
}