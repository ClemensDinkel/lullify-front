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

const Navigation = () => {
  const { tk, dTk, sUI } = useContext(UserContext)
  const [decToken, setDecToken] = dTk
  const [token, setToken] = tk
  const [singleUserInfo] = sUI
  let history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    api.logoutUser()
      .then(() => {
        localStorage.clear();
        setToken("");
        setDecToken(null);
        alert(`${decToken.user_name} logged out`);
        history.push("/");
      })
      .catch(err => console.log(err))
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed>
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
            className="mr-auto my-2 my-lg-0 flex-row"
            style={{ maxHeight: "100px", marginRight: "15px", justifyContent: "space-around", flexWrap: "wrap"}}
            navbarScroll
          >
            <Nav.Link href="/" style={{ padding: "10px", margin: "auto"}}>
              <b>Home</b>
            </Nav.Link>
            <Nav.Link href="/about" style={{ padding: "10px", margin: "auto" }}>
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
                <Nav.Link href="/login" style={{ padding: "10px", margin: "auto" }}>
                  <b>Login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {(decToken.role === "admin" || decToken.role === "content_creator") && (
                  <>
                    <Nav.Link href="/creatorpanel" style={{ padding: "10px", margin: "auto" }}><b>CreatorPanel</b></Nav.Link>
                  </>
                )}
                {decToken.role === "admin" && (
                  <>
                    <Nav.Link href="/adminpanel" style={{ padding: "10px", margin: "auto" }}><b>AdminPanel</b></Nav.Link>
                  </>
                )}
                {(decToken.role === "admin" || decToken.role === "content_creator" || decToken.role === "user") && (
                  <>
                    <div style={{ padding: "10px", margin: "auto", display: "flex" }}>
                      <Navbar.Brand style={{paddingRight: 0, marginRight: 0}}>
                        <Image src={singleUserInfo.user_img_url} width="30px" height="30px" roundedCircle />
                      </Navbar.Brand>

                      <NavDropdown
                        title={decToken.user_name}
                        id="navbarScrollingDropdown"
                        style={{paddingLeft: 0, marginLeft: "5px"}}
                      >
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
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
