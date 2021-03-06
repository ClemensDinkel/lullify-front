import { useEffect } from "react";
import { useState, createContext } from "react";

export const PlaylistContext = createContext()

export const PlaylistController = ({ children }) => {
  const [playedList, setPlayedList] = useState([])
  const [temporaryPlaylist, setTemporaryPlaylist] = useState([])
  const [permanentPlaylists, setPermanentPlaylists] = useState([])
  const [selectedListIndex, setSelectedListIndex] = useState(0)

  useEffect(() => {
    if (permanentPlaylists.length <= selectedListIndex) setSelectedListIndex(0)
  }, [permanentPlaylists])

  return (
    <PlaylistContext.Provider value={{
      ppl: [playedList, setPlayedList],
      tl: [temporaryPlaylist, setTemporaryPlaylist],
      perl: [permanentPlaylists, setPermanentPlaylists],
      sl: [selectedListIndex, setSelectedListIndex]
    }}>
      {children}
    </PlaylistContext.Provider>
  )
}