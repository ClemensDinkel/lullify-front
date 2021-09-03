import { useState, useEffect, createContext } from "react";

export const VideoContext = createContext()

export const VideoController = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [videosLoaded, setVideosLoaded] = useState(false)
  /* useEffect(() => {
    console.log("video context")
    api.getVideos()
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  }, []) */

  /* useEffect(() => {
    console.log(videosLoaded)
  }, [videosLoaded]) */

  return (
    <VideoContext.Provider value={[videos, setVideos, videosLoaded, setVideosLoaded]}>
      {children}
    </VideoContext.Provider>
  )
}