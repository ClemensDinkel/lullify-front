import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import logo_image from "../images/moon2.png";
import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from '../context/UserContext'
import { QueryContext } from '../context/QueryContext'
import { VideoContext } from "../context/VideoContext";
import { EscapeContext } from "../context/EscapeContext";
import api from "../api";
import "../App.css"

const Navigation = ({ handlePageScroll }) => {
  const { tk, dTk, sUI } = useContext(UserContext)
  const [decToken, setDecToken] = dTk
  const [token, setToken] = tk
  const [singleUserInfo] = sUI
  const { ft, lg } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [lang, setLang] = lg
  const [videos, setVideos] = useContext(VideoContext)
  const [show, setShow] = useState(false)
  const [escapeUE, setEscapeUE] = useContext(EscapeContext)

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
          history.push("/");
        })
        .catch(err => console.log(err))
  };

  const update = (e) => {
    e.preventDefault();
    if (history.location.pathname.split("/")[1] === "player") {
      console.log("coming")
      history.push("/")
      setEscapeUE(true)
    }
    api.getVideos(lang, filter)
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  }

    return (
      <>
        <Navbar className={`navbar ${show && "navbar-scroll"}`} expand="lg" sticky="top">
          <Navbar.Brand as={Link} to="/">
            {/* <Image
            src={logo_image}
            style={{
              display: "inline-block",
              maxHeight: "70px",
              maxWidth: "100px",
              paddingLeft: "10px"
            }}
          /> */}
            <h5 style={{ fontSize: "30px", fontFamily: "serif", color: "#404040", display: "block" }} >
              👥<b>Lullifey</b>
            </h5>
          </Navbar.Brand>

          <Form className="d-flex justify-content-space-between" onSubmit={update}>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
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
              <Nav.Link as={Link} to="/" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}>
                <b>Home</b>
              </Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}>
                <b>About Us</b>
              </Nav.Link>

              {!decToken ? (
                <>
                  <NavDropdown
                    title="Register"
                    id="navbarScrollingDropdown"
                    style={{ fontWeight: "bold", padding: "2px", margin: "0", fontColor: "gray" }}
                  >
                    <NavDropdown.Item as={Link} to="/register/userRegister" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}>
                      User
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register/creatorRegister" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}>
                      Content Creator
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/login" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}>
                    <b>Login</b>
                  </Nav.Link>
                </>
              ) : (
                <>
                  {(decToken.role === "admin" || decToken.role === "content_creator") && (
                    <>
                      <Nav.Link as={Link} to="/creatorpanel" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}><b>CreatorPanel</b></Nav.Link>
                    </>
                  )}
                  {decToken.role === "admin" && (
                    <>
                      <Nav.Link as={Link} to="/adminpanel" style={{ padding: "10px", margin: "auto" }} onClick={handlePageScroll}><b>AdminPanel</b></Nav.Link>
                    </>
                  )}
                  {(decToken.role === "admin" || decToken.role === "content_creator" || decToken.role === "user") && (

                    <div style={{ padding: "10px", margin: "auto", display: "flex" }}>
                      <Navbar.Brand style={{ paddingRight: 0, marginRight: 0 }}>
                        <Image src={singleUserInfo.user_img_url} width="30px" height="30px" roundedCircle />
                      </Navbar.Brand>

                      <NavDropdown
                        title={decToken.user_name}
                        id="navbarScrollingDropdown"
                        style={{ fontWeight: "bold", margin: "0" }}
                      >
                        <NavDropdown.Item as={Link} to="/profile" style={{ padding: "10px" }} onClick={handlePageScroll}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut} style={{ padding: "10px" }}>LogOut</NavDropdown.Item>
                      </NavDropdown>
                    </div>

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
