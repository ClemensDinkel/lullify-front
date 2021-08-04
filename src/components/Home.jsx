import { useState, useContext, useEffect, useRef } from "react";
import Previews from "./Previews";
import Playlists from "./Playlists";
import TemporaryPlaylist from "./TemporaryPlaylist";
import { UserContext } from "../context/UserContext";
import { VideoContext } from "../context/VideoContext";
import { EscapeContext } from "../context/EscapeContext";
import "../App.css";
import api from "../api";
import { Button } from 'react-bootstrap'
import { AiOutlineArrowDown } from 'react-icons/ai'

const Home = () => {
  const { dTk, sUI } = useContext(UserContext);
  const [decToken] = dTk;
  const [singleUserInfo] = sUI
  const [videos, setVideos] = useContext(VideoContext)
  const [escapeUE, setEscapeUE] = useContext(EscapeContext)

  const putFavoritesFirst = array => {
    // put users favorites first
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
    // only execute on first render
    if (!escapeUE) {
      setEscapeUE(true)
      api.getVideos()
        .then(res => setVideos(res.data))
        .catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    // fires as soon user data is available and reorders favorite videos on top
    const favoriteFirstArray = putFavoritesFirst(videos.slice())
    setVideos(favoriteFirstArray)
  }, [singleUserInfo])

  const scrollRef = useRef(null)

  const handlePageScrollDown = () => {
    scrollRef.current.scrollIntoView()
  };

  return (
    <div className="main-container home-container">
      <div className="previews-container-plus-button">
        <Previews  />
        <div className="scroll-down">
          <Button type="button" variant="outline-light" onClick={handlePageScrollDown} style={{ maxHeight: "40px" }}>
            <AiOutlineArrowDown />
          </Button>
        </div>
      </div>
      <div ref={scrollRef}>
        {decToken && decToken.id ?
          <Playlists />
          :
          <TemporaryPlaylist />}
      </div>
    </div>
  );
};

export default Home;
