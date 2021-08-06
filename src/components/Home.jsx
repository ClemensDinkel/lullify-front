import { useContext, useEffect, useRef } from "react";
import Previews from "./Previews";
import Playlists from "./Playlists";
import TemporaryPlaylist from "./TemporaryPlaylist";
import { UserContext } from "../context/UserContext";
import { VideoContext } from "../context/VideoContext";
import { EscapeContext } from "../context/EscapeContext";
import "../App.css";
import api from "../api";
import { Button, Spinner } from 'react-bootstrap'
import { AiOutlineArrowDown } from 'react-icons/ai'

const Home = () => {
  const { dTk, sUI } = useContext(UserContext);
  const [decToken] = dTk;
  const [singleUserInfo] = sUI
  const [videos, setVideos, videosLoaded, setVideosLoaded] = useContext(VideoContext)
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
      setVideosLoaded(false)
      api.getVideos()
        .then(res => {
          const favoriteFirstArray = putFavoritesFirst(res.data)
          setVideos(favoriteFirstArray)
          setVideosLoaded(true)
        })
        .catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    // if user logs in while videos are already loaded
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
        {videosLoaded ?
          <>
            <Previews />
            <div className="scroll-down">
              <Button type="button" variant="outline-light" onClick={handlePageScrollDown} style={{ maxHeight: "40px" }}>
                <AiOutlineArrowDown />
              </Button>
            </div>
          </> :
          <div>
            <Spinner animation="border" role="status" variant="light" style={{ height: "100px", width: "100px" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
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
