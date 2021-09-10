import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";

const NaviLinks = (goHome, handlePageScroll, decToken, logOut) => {

  return (
    <>
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
    </>
  )
}

export default NaviLinks