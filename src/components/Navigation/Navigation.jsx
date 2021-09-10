import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import { QueryContext } from '../../context/QueryContext'
import { VideoContext } from "../../context/VideoContext";
import api from "../../api";
import "../../App.css"
import SearchBar from "./SearchBar";

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

  const update = (e) => {
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

  const goHome = () => {
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
        <Navbar.Brand as={Link} to="/" onClick={goHome}>
          <h5 style={{ fontSize: "30px", fontFamily: "serif", color: "#404040", display: "block" }} onClick={handlePageScroll} >
            🌚<b>Lullifey</b>
          </h5>
        </Navbar.Brand>
        {/* <SearchBar
          update={update}
          lang={setLang}
          setLang={setLang}
          filter={setFilter}
          setFilter={setFilter}
          show={show}
        /> */}
        <Form className="d-flex justify-content-space-between" onSubmit={update}>
          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            value={lang}
            onChange={(e) => {
              setLang(e.target.value)
            }}
            custom
          >
            <option value=""></option>
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="hi">HI</option>
          </Form.Control>
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button type="submit" variant={`dark ${show && "light"}`} >
            <b>Search</b>
          </Button>
        </Form>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="mr-auto my-2 my-lg-0 flex-row"
            style={{ maxHeight: "100px", marginRight: "15px", justifyContent: "space-around", flexWrap: "wrap" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" className="navbar-item" onClick={goHome}>
              <b>Home</b>
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="navbar-item" onClick={handlePageScroll}>
              <b>About Us</b>
            </Nav.Link>

            {!decToken ? (
              <>
                <NavDropdown
                  title="Sign up"
                  id="navbarScrollingDropdown"
                  style={{ fontWeight: "bold", padding: "2px", margin: "0", fontColor: "gray" }}
                >
                  <NavDropdown.Item as={Link} to="/signUp/user" className="navbar-item" onClick={handlePageScroll}>
                    User
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signUp/creator" className="navbar-item" onClick={handlePageScroll}>
                    Content Creator
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/login" className="navbar-item" onClick={handlePageScroll}>
                  <b>Login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {(decToken.role === "admin" || decToken.role === "content_creator") && (
                  <>
                    <Nav.Link as={Link} to="/creatorpanel" className="navbar-item" onClick={handlePageScroll}><b>CreatorPanel</b></Nav.Link>
                  </>
                )}
                {decToken.role === "admin" && (
                  <>
                    <Nav.Link as={Link} to="/adminpanel" className="navbar-item" onClick={handlePageScroll}><b>AdminPanel</b></Nav.Link>
                  </>
                )}
                {(decToken.role === "admin" || decToken.role === "content_creator" || decToken.role === "user") && (
                  <>
                    <Nav.Link as={Link} to="/profile" className="navbar-item" onClick={handlePageScroll}><b>Profile</b></Nav.Link>
                    <Nav.Link onClick={logOut} style={{ padding: "10px" }}><b>LogOut</b></Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
