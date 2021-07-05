import { Card, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import api from "../api";

const UserRegister = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const [newRegister, setNewRegister] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    errors: {},
  });

  let history = useHistory();

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setNewRegister((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: newRegister.first_name,
      last_name: newRegister.last_name,
      user_name: newRegister.user_name,
      email: newRegister.email,
      password: newRegister.password,
    };

    api
      .registerUser(newUser)
      .then(() => {
        alert("Successfully registered");
        history.push(`/login`);
      })
      .catch((err) =>
        alert("Email already exist. Please try with another email")
      );
  };

  return (
    <div className= "registration-container"
    >
      <div className="registration-info">
        <div style={{ color: "white" }}>
          <h1 style={{ fontFamily: "cursive" }}>Lullify</h1>
          <p>Register yourself to enjoy more functionaliy in lullify.</p>
        </div>
      </div>
      <div className="registration-info">
        <Card
          bg="light"
          style={{ flexGrow: "1", maxWidth: "50rem", height: "fit-content", textAlign: "left" }}
        >
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Label>
                <span style={{ color: "red" }}>*</span> Fields are required
              </Form.Label>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>First name:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First name"
                    name="first_name"
                    value={newRegister.first_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Last name:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last name"
                    name="last_name"
                    value={newRegister.last_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>User name:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
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
                  <Form.Label>
                    <b>Email Address:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
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
                  <Form.Label>
                    <b>Password:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Control
                      type={passwordShow ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={newRegister.password}
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
                  <b>Submit</b>
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

export default UserRegister;
