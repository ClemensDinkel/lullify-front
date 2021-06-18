import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
/* import { Link } from 'react-router-dom'; */
import logo_image from '../images/logo5.png'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AdminPanel from './AdminPanel';

const Navigation = ({ user, setToken, setUser }) => {
  const history = useHistory()

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setToken("");
    setUser(null)
    alert(`${user.user_name} logged out`)
    history.push('/')
  }


  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/"><img src={logo_image} alt="lullify-logo" /></Navbar.Brand>



        <Form className="d-flex">
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
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" justify-content-space-between="true">

          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{/*  maxHeight: '100px'  */}}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            {
              !user ?
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <NavDropdown title="Register" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/register/userRegister">User</NavDropdown.Item>
                    <NavDropdown.Item href="/register/creatorRegister">Content Creator</NavDropdown.Item>
                  </NavDropdown>
                </>
                :
                <>
                  {(user.role === "admin" || user.role === "content_creator") &&
                    <>
                      <Nav.Link href="/creator">CreatorPanel</Nav.Link>
                    </>
                  }
                  {user.role === "admin" &&
                    <>
                      <Nav.Link href="/adminpanel">AdminPanel</Nav.Link>
                    </>
                  }
                  <NavDropdown title={user.user_name} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/profile" >Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
                  </NavDropdown>
                </>
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigation