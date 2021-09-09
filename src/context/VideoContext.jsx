import { useState, createContext } from "react";

export const VideoContext = createContext()

export const VideoController = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [videosLoaded, setVideosLoaded] = useState(false)

  return (
    <VideoContext.Provider value={[videos, setVideos, videosLoaded, setVideosLoaded]}>
      {children}
    </VideoContext.Provider>
  )
}