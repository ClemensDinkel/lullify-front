import { Card, Col, Form, Button } from "react-bootstrap";
import { register } from "./AuthFunctions";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const UserRegister = () => {
  const [newRegister, setNewRegister] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    errors: {},
  })

  let history = useHistory()

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setNewRegister((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: newRegister.first_name,
      last_name: newRegister.last_name,
      user_name: newRegister.user_name,
      email: newRegister.email,
      password: newRegister.password,
    };

    register(queryString.stringify(newUser)).then((res) => {
      alert('Yor are Registerd')
      history.push(`/login`);
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ flexGrow: "1", maxWidth: "30rem" }}>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First name"
                    name="first_name"
                    value={newRegister.first_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last name"
                    name="last_name"
                    value={newRegister.last_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User name"
                    name="user_name"
                    value={newRegister.user_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newRegister.email}
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={newRegister.password}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UserRegister;
