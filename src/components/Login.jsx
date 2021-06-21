import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import api from "../api";

const Login = ({ setToken }) => {
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
        console.log(res.data)
        localStorage.setItem('auth-token', res.data.accessToken)
        setToken(res.data.accessToken)
        history.push(`/`)
      })
      .catch(err => console.log(err))
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
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={newLogin.password}
                  onChange={onChange}
                  required
                />
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
