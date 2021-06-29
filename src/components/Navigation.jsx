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
import { useHistory, Link } from "react-router-dom";
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
            <Nav.Link as={Link} to="/" style={{ padding: "10px", margin: "auto" }}>
              <b>Home</b>
            </Nav.Link>

            <Nav.Link as={Link} to="/about" style={{ padding: "10px", margin: "auto" }}>
              <b>About Us</b>
            </Nav.Link>

            {!decToken ? (
              <>
                <NavDropdown
                  title="Register"
                  id="navbarScrollingDropdown"
                  style={{ fontWeight: "bold", padding: "10px", margin: "auto" }}
                >
                  <NavDropdown.Item href="/register/userRegister">
                    <Nav.Link as={Link} to="/register/userRegister" style={{ padding: "10px", margin: "auto" }}>
                      <b>User</b>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register/creatorRegister">
                    <Nav.Link as={Link} to="/register/creatorRegister" style={{ padding: "10px", margin: "auto" }}>
                      <b>Creator</b>
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/login" style={{ padding: "10px", margin: "auto" }}>
                  <b>Login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {(decToken.role === "admin" || decToken.role === "content_creator") && (
                  <>
                    <Nav.Link as={Link} to="/creatorpanel" style={{ padding: "10px", margin: "auto" }}><b>CreatorPanel</b></Nav.Link>
                  </>
                )}
                {decToken.role === "admin" && (
                  <>
                    <Nav.Link as={Link} to="/adminpanel" style={{ padding: "10px", margin: "auto" }}><b>AdminPanel</b></Nav.Link>
                  </>
                )}
                {(decToken.role === "admin" || decToken.role === "content_creator" || decToken.role === "user") && (
                  <>
                    <div style={{ padding: "10px", margin: "auto", display: "flex" }}>
                      <Navbar.Brand style={{ paddingRight: 0, marginRight: 0 }}>
                        <Image src={singleUserInfo.user_img_url} width="30px" height="30px" roundedCircle/>
                      </Navbar.Brand>

                      <NavDropdown
                        title={decToken.user_name}
                        id="navbarScrollingDropdown"
                        style={{ fontWeight: "bold", padding: "10px", margin: "auto" }}
                      >
                        <NavDropdown.Item>
                          <Nav.Link as={Link} to="/profile" style={{ padding: "10px", margin: "auto" }}>
                            <b>Profile</b>
                          </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut}>
                          LogOut
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
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
