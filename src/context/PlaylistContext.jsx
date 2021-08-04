import { useEffect } from "react";
import { useState, createContext } from "react";

export const PlaylistContext = createContext()

export const PlaylistController = ({ children }) => {
  const [playedList, setPlayedList] = useState([])
  const [temporaryPlaylist, setTemporaryPlaylist] = useState([])
  const [permanentPlaylists, setPermanentPlaylists] = useState([])

  useEffect(() => {
    console.log(playedList)
  }, [playedList])

  useEffect(() => {
    console.log(temporaryPlaylist)
  }, [temporaryPlaylist])

  return (
    <PlaylistContext.Provider value={{
      ppl: [playedList, setPlayedList],
      tl: [temporaryPlaylist, setTemporaryPlaylist],
      perl: [permanentPlaylists, setPermanentPlaylists]
    }}>
      {children}
    </PlaylistContext.Provider>
  )
}