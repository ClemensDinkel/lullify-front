import { useContext, useEffect } from "react";
import Previews from "./Previews";
import Playlists from "./Playlists";
import TemporaryPlaylist from "./TemporaryPlaylist";
import { UserContext } from "../context/UserContext";
import { QueryContext } from "../context/QueryContext";
import { VideoContext } from "../context/VideoContext";
import { EscapeContext } from "../context/EscapeContext";
import "../App.css";
import api from "../api";

const Home = () => {
  const { dTk, sUI } = useContext(UserContext);
  const [decToken] = dTk;
  const [singleUserInfo] = sUI
  const { ft } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [videos, setVideos] = useContext(VideoContext)
  const [escapeUE, setEscapeUE] = useContext(EscapeContext)

  const shuffle = array => {
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      return array;
    }
  }
  const putFavoritesFirst = array => {
    // put favorites first
    if (singleUserInfo.favorites) {
      for (let i = 0; i < array.length; i++) {
        if (singleUserInfo.favorites.some(favorite => favorite._id === array[i]._id)) {
          array.unshift(array.splice(i, 1)[0])
        }
      }
    }
    return array
  }

  useEffect(() => {
    // only execute if not being pushed here from player by making a search from there
    if (!escapeUE) {
      setFilter("")
      api.getVideos()
        .then(res => {
          const shuffledArray = shuffle(res.data)
          const favoriteFirstArray = putFavoritesFirst(shuffledArray) // shuffledArray
          setVideos(favoriteFirstArray)
        })
        .catch(err => console.log(err))
    } else setEscapeUE(false)
  }, [])

  /* useEffect(() => {
    setVideos(videos)
  }, []) */

  return (
    <div className="main-container home-container">
      <Previews />
      {decToken && decToken.id ? <Playlists /> : <TemporaryPlaylist />}
    </div>
  );
};

export default Home;
