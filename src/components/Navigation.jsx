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

const Navigation = () => {
  console.log(useContext(UserContext))
  const {tk, dTk, sUI} = useContext(UserContext)
  const [decToken, setDecToken] = dTk
  const [token, setToken] = tk
  const [singleUserInfo] = sUI
  let history = useHistory();

  const logOut = (e) => {
    //e.preventDefault();
    localStorage.clear();
    setToken("");
    setDecToken(null);
    alert(`${decToken.user_name} logged out`);
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
                <Nav.Link href="/login">
                  <b>Login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {(decToken.role === "admin" || decToken.role === "content_creator") && (
                  <>
                    <Nav.Link href="/creator"><b>CreatorPanel</b></Nav.Link>
                  </>
                )}
                {decToken.role === "admin" && (
                  <>
                    <Nav.Link href="/adminpanel"><b>AdminPanel</b></Nav.Link>
                  </>
                )}

                <Image src={singleUserInfo.user_img_url} alt="profile-image" width="5px" height="5px" roundedCircle />

                <NavDropdown
                  title={decToken.user_name}
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
