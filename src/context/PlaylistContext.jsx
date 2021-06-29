import { useEffect } from "react";
import { useState, createContext } from "react";

export const PlaylistContext = createContext()

export const PlaylistController = ({ children }) => {
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    console.log(playlist)
  },[])

  return (
    <PlaylistContext.Provider value={[playlist, setPlaylist]}>
      {children}
    </PlaylistContext.Provider>
  )
}