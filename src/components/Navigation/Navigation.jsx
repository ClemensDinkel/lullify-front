import { Navbar} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import { QueryContext } from '../../context/QueryContext'
import { VideoContext } from "../../context/VideoContext";
import api from "../../api";
import "../../App.css"
import SearchBar from "./SearchBar";
import NaviLinks from "./NaviLinks";

const Navigation = ({ handlePageScroll }) => {
  const { tk, dTk, sUI } = useContext(UserContext)
  const [decToken, setDecToken] = dTk
  const [token, setToken] = tk
  const [singleUserInfo, setSingleUserInfo] = sUI
  const { ft, lg } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [lang, setLang] = lg
  const [videos, setVideos, videosLoaded, setVideosLoaded] = useContext(VideoContext)
  const [show, setShow] = useState(false)

  let history = useHistory();

  //To change the color of navbar after scrolling
  const navbarControl = () => {
    if (window.scrollY > 100) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', navbarControl)
    return () => { window.removeEventListener('scroll', navbarControl) }
  }, [])

  const putFavoritesFirst = array => {
    if (singleUserInfo.favorites && videos) {
      for (let i = 0; i < array.length; i++) {
        if (singleUserInfo.favorites.some(favorite => favorite._id === array[i]._id)) {
          array.unshift(array.splice(i, 1)[0])
        }
      }
    }
    return array
  }

  const updateSearchBar = (e) => {
    setVideosLoaded(false)
    if (e) e.preventDefault();
    const path = history.location.pathname.split("/")[1];
    if (path === "adminpanel") {
      api.getAllVideos(lang, filter)
        .then(res => {
          setVideosLoaded(true)
          setVideos(res.data)
        })
        .catch(err => console.log(err))
    } else {
      api.getVideos(lang, filter)
        .then(res => {
          setVideosLoaded(true)
          const favoriteFirstArray = putFavoritesFirst(res.data)
          setVideos(favoriteFirstArray)
          if (path === "player" || path === "about" || path === "creatorpanel") history.push("/")
        })
        .catch(err => console.log(err))
    }
  }

  const logOut = (e) => {
    e.preventDefault();
    window.confirm(`${decToken.user_name}, Do you want to log out?`) &&
      api.logoutUser()
        .then(() => {
          localStorage.clear();
          setToken("");
          setDecToken(null);
          setSingleUserInfo([])
          history.push("/");
        })
        .catch(err => console.log(err))
  };

  const goHomeAndRefresh = () => {
    const path = history.location.pathname.split("/")[1];
    if (path === "") return
    setVideos([])
    setVideosLoaded(false)
    api.getVideos()
      .then(res => {
        setVideosLoaded(true)
        const favoriteFirstArray = putFavoritesFirst(res.data)
        setVideos(favoriteFirstArray)
        setFilter("")
      })
      .catch(err => console.log(err))
    handlePageScroll();
  }

  return (
    <>
      <Navbar className={`navbar ${show && "navbar-scroll"}`} expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/" onClick={goHomeAndRefresh}>
          <h5 style={{ fontSize: "30px", fontFamily: "serif", color: "#404040", display: "block" }} onClick={handlePageScroll} >
            🌚<b>Lullifey</b>
          </h5>
        </Navbar.Brand>
        <SearchBar
          lang={lang}
          setLang={setLang}
          filter={filter}
          setFilter={setFilter}
          show={show}
          updateSearchBar={updateSearchBar}
        />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <NaviLinks
            goHomeandRefresh={goHomeAndRefresh}
            handlePageScroll={handlePageScroll}
            decToken={decToken}
            logOut={logOut}
          />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
