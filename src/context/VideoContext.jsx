import { useState, useEffect, createContext } from "react";

export const VideoContext = createContext()

export const VideoController = ({ children }) => {
  const [videos, setVideos] = useState([])

  /* useEffect(() => {
    console.log("video context")
    api.getVideos()
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  }, []) */

  /* useEffect(() => {
    console.log(videos)
  }, [videos]) */

  return (
    <VideoContext.Provider value={[videos, setVideos]}>
      {children}
    </VideoContext.Provider>
  )
}