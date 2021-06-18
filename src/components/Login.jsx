import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "./AuthFunctions";
import { Card, Form, Button } from "react-bootstrap";
import queryString from "query-string";

const Login = ({ setToken }) => {
  const [newLogin, setNewLogin] = useState({
    email: "",
    password: "",
    errors: {}
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
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const loginUser = {
      email: newLogin.email,
      password: newLogin.password,
    };

    login(queryString.stringify(loginUser)).then((res) => {
      console.log(res)
      setToken(res.accessToken)
      history.push(`/`);
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ flexGrow: "1", maxWidth: "30rem" }}>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User</Form.Label>
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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={newLogin.password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login