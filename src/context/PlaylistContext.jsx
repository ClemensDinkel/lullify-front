import { useEffect } from "react";
import { useState, createContext } from "react";

export const PlaylistContext = createContext()

export const PlaylistController = ({ children }) => {
  const [autoPlaylist, setAutoPlaylist] = useState([])

  /* useEffect(() => {
    console.log(autoPlaylist)
  },[autoPlaylist]) */

  return (
    <PlaylistContext.Provider value={[autoPlaylist, setAutoPlaylist]}>
      {children}
    </PlaylistContext.Provider>
  )
}