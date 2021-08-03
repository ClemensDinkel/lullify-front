import { useContext, useEffect, useRef } from "react";
import Previews from "./Previews";
import Playlists from "./Playlists";
import TemporaryPlaylist from "./TemporaryPlaylist";
import { UserContext } from "../context/UserContext";
import { QueryContext } from "../context/QueryContext";
import { VideoContext } from "../context/VideoContext";
import { EscapeContext } from "../context/EscapeContext";
import "../App.css";
import api from "../api";
import { Button } from 'react-bootstrap'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { DnDController } from "../context/DnDContext"

const Home = () => {
  const { dTk, sUI } = useContext(UserContext);
  const [decToken] = dTk;
  const [singleUserInfo] = sUI
  const { ft } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [videos, setVideos] = useContext(VideoContext)
  const [escapeUE, setEscapeUE] = useContext(EscapeContext)
  /* const shuffle = array => {
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
  } */ // replaced by backend randomization

  const putFavoritesFirst = array => {
    // put favorites first
    if (singleUserInfo.favorites && videos) {
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
      api.getVideos()
        .then(res => {
          // const shuffledArray = shuffle(res.data)
          const favoriteFirstArray = putFavoritesFirst(res.data) // shuffledArray
          setVideos(favoriteFirstArray)
          // setVideos(favoriteFirstArray.slice(0,24)) // limit to 24 hits
          setFilter("")
        })
        .catch(err => console.log(err))
    } else {
      setEscapeUE(false)
      setFilter("")
    }
  }, [singleUserInfo])


  const scrollRef = useRef(null)

  const handlePageScrollDown = () => {
    scrollRef.current.scrollIntoView()
  };

  return (
    <div className="main-container home-container">
      <DnDController>
      <div className="previews-container-plus-button">
        <Previews />
        <div className="scroll-down">
          <Button type="button" variant="outline-light" onClick={handlePageScrollDown} style={{ maxHeight: "40px" }}>
            <AiOutlineArrowDown />
          </Button>
        </div>
      </div>
      <div ref={scrollRef}>
        {decToken && decToken.id ? <Playlists /> : <TemporaryPlaylist />}
      </div>
      </DnDController>
    </div>
  );
};

export default Home;
