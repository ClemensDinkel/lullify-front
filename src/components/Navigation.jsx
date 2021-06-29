import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import logo_image from "../images/logo7.png";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext'
import api from "../api";
import "../App.css"

const Navigation = () => {
  const { tk, dTk, sUI } = useContext(UserContext)
  const [decToken, setDecToken] = dTk
  const [token, setToken] = tk
  const [singleUserInfo] = sUI
  let history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    window.confirm(`${decToken.user_name}, Do you want to logged out?`) &&
    api.logoutUser()
      .then(() => {
        localStorage.clear();
        setToken("");
        setDecToken(null);
        history.push("/");
      })
      .catch(err => console.log(err))
  };

  return (
    <>
      <Navbar className="navbar" expand="lg" fixed>
        <Navbar.Brand exact href="/">
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
            <option value="hindi">HI</option>
          </Form.Control>
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button type="submit" variant="success">
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
            <Nav.Link href="/" style ={{padding: "10px"}}>
              <b>Home</b>
            </Nav.Link>
            <Nav.Link href="/about" style ={{padding: "10px"}}>
              <b>About Us</b>
            </Nav.Link>
            {!decToken ? (
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
                <Nav.Link href="/login" style ={{padding: "10px"}}>
                  <b>Login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {(decToken.role === "admin" || decToken.role === "content_creator") && (
                  <>
                    <Nav.Link href="/creatorpanel" style ={{padding: "10px"}}><b>CreatorPanel</b></Nav.Link>
                  </>
                )}
                {decToken.role === "admin" && (
                  <>
                    <Nav.Link href="/adminpanel" style ={{padding: "10px"}}><b>AdminPanel</b></Nav.Link>
                  </>
                )}
                {(decToken.role === "admin" || decToken.role === "content_creator" || decToken.role === "user") && (
                <>
                <Navbar.Brand>
                  <Image src={singleUserInfo.user_img_url} width="30px" height="30px" roundedCircle />
                </Navbar.Brand>

                <NavDropdown
                  title= {decToken.user_name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
                </NavDropdown>
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
