import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";
import "../App.css";
import api from "../api";
import { UserContext } from '../context/UserContext'

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const { tk } = useContext(UserContext)
  const [token, setToken] = tk
  const [newLogin, setNewLogin] = useState({
    email: "",
    password: "",
    errors: {},
  });
  let history = useHistory();

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setNewLogin((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userLogin = {
      email: newLogin.email,
      password: newLogin.password,
    };

    api.loginUser(userLogin)
      .then(res => {
        localStorage.setItem('auth-token', res.data.accessToken)
        setToken(res.data.accessToken)
        history.push(`/`)
      })
      .catch(err => alert("Enter correct Email & Password."))
  };

  return (
    <div className="main-container" style={{ display: "block"}} >
      <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px"}}>
        <Card bg="light" style={{ flexGrow: "1", maxWidth: "30rem", height: "fit-content", textAlign: "left" }}>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Label>
                <span style={{ color: "red" }}>*</span> Fields are required
              </Form.Label>
              <Form.Row>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <b>Email Address:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newLogin.email}
                    onChange={onChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <b>Password:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <InputGroup className="mb-2">
                    <Form.Control
                      type={passwordShow ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={newLogin.password}
                      onChange={onChange}
                      required
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        {!passwordShow ? (
                          <span
                            className="password-icon"
                            onClick={() => setPasswordShow(!passwordShow)}
                          >
                            <BiShow />
                          </span>
                        ) : (
                          <span
                            className="password-icon"
                            onClick={() => setPasswordShow(!passwordShow)}
                          >
                            <BiHide />
                          </span>
                        )}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "10px",
                }}
              >
                <Button variant="outline-secondary" type="submit">
                  <b>Login</b>
                </Button>
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  <b>Cancel</b>
                </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
