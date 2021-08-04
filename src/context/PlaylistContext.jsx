import { useEffect } from "react";
import { useState, createContext } from "react";

export const PlaylistContext = createContext()

export const PlaylistController = ({ children }) => {
  const [playedList, setPlayedList] = useState([])
  const [temporaryPlaylist, setTemporaryPlaylist] = useState([])
  const [permanentPlaylists, setPermanentPlaylists] = useState([])
  const [selectedListIndex, setSelectedListIndex] = useState(0)

  useEffect(() => {
    console.log(playedList)
  }, [playedList])

  useEffect(() => {
    console.log(temporaryPlaylist)
  }, [temporaryPlaylist])

  useEffect(() => {
    console.log(selectedListIndex)
  }, [selectedListIndex])

  useEffect(() => {
    console.log(permanentPlaylists)
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