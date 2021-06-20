import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
/* import { Link } from 'react-router-dom'; */
import logo_image from "../images/logo7.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminPanel from "./AdminPanel";

const Navigation = ({ user, setToken, setUser, singleUserInfo }) => {
  const history = useHistory();

  console.log(singleUserInfo);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setToken("");
    setUser(null);
    alert(`${user.user_name} logged out`);
    history.push("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed>
        <Navbar.Brand href="/">
          <Image
            src={logo_image}
            style={{
              display: "inline-block",
              maxHeight: "70px",
              width: "100px",
            }}
          />
          {/* <span style={{ fontSize: '40px', fontFamily: 'cursive', color:'#0C7C43' }} >
                        Lullify
                    </span> */}
        </Navbar.Brand>

        <Form className="d-flex justify-content-space-between">
          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            custom
          >
            <option value=""></option>
            <option value="english">EN</option>
            <option value="deutsch">DE</option>
            <option value="hindi">IN</option>
          </Form.Control>
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", marginRight: "15px" }}
            navbarScroll
          >
            <Nav.Link href="/">
              <b>Home</b>
            </Nav.Link>
            <Nav.Link href="/about">
              <b>About Us</b>
            </Nav.Link>
            {!user ? (
              <>
                <NavDropdown
                  title="Register"
                  id="navbarScrollingDropdown"
                  style={{ fontWeight: "bold" }}
                >
                  <NavDropdown.Item href="/register/userRegister">
                    User
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register/creatorRegister">
                    Content Creator
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/login">
                  <b>Login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {(user.role === "admin" || user.role === "content_creator") && (
                  <>
                    <Nav.Link href="/creator">CreatorPanel</Nav.Link>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <Nav.Link href="/adminpanel">AdminPanel</Nav.Link>
                  </>
                )}

                <Image src={singleUserInfo.user_img_url} roundedCircle />

                <NavDropdown
                  title={user.user_name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
