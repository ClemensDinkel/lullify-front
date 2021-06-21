import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "./AuthFunctions";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import queryString from "query-string";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import "../App.css";

const Login = ({ setToken }) => {

  const [passwordShow, setPasswordShow] = useState(false);

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

    const loginUser = {
      email: newLogin.email,
      password: newLogin.password,
    };

    login(queryString.stringify(loginUser))
      .then((res) => {
        console.log(res);
        setToken(res.accessToken);
        history.push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ flexGrow: "1", maxWidth: "30rem", textAlign: "left" }}>
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
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  history.push("/");
                }}
              >
                Cancel
              </Button>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
