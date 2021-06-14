import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import logo_image from '../images/logo5.png'

const Navigation = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/"><img src={logo_image} alt="lullify-logo"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" justify-content-space-between>

                    <Form className="d-flex">
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            custom
                        >
                            <option value="0">Languages</option>
                            <option value="english">English</option>
                            <option value="deutsch">Deutsch</option>
                            <option value="hindi">Hindi</option>
                        </Form.Control>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>

                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <NavDropdown title="Register" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/register/userRegister">User</NavDropdown.Item>
                            <NavDropdown.Item href="/register/creatorRegister">Content Creator</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation