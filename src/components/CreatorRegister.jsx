import { Card, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import api from "../api";

const CreatorRegister = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const [ccRegister, setCcRegister] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    phone: "",
    city_code: "",
    city_name: "",
    country: "",
    company: "",
    requested_to_be_cc: true,
    errors: {},
  });

  let history = useHistory();

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setCcRegister((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: ccRegister.first_name,
      last_name: ccRegister.last_name,
      user_name: ccRegister.user_name,
      email: ccRegister.email,
      password: ccRegister.password,
      phone: ccRegister.phone,
      street: ccRegister.street,
      house_nr: ccRegister.house_nr,
      city_code: ccRegister.city_code,
      city_name: ccRegister.city_name,
      country: ccRegister.country,
      company: ccRegister.company,
      requested_to_be_cc: true,
    };

    api
      .registerUser(newUser)
      .then(() => {
        alert(
          "Successfully registered. Enjoy Lullify still Admin promotes you to Content Creator!"
        );
        history.push(`/login`);
      })
      .catch((err) =>
        alert("Email already exist. Please try with another email")
      );
  };

  return (
    <div className= "registration-container">
      <div className="registration-info">
        <div style={{ marginBottom: "30px", color: "white" }}>
          <h1 style={{ fontFamily: "cursive" }}>Lullify</h1>
          <p>
            Register yourself to enjoy more functionaliy in lullify.<br /> Admin will
            contact you and promote you after checking all information
          </p>
        </div>
      </div>
      <div className="registration-creator">
        <Card style={{ flexGrow: "1", maxWidth: "30rem", minWidth: "25rem", height: "fit-content", textAlign: "left" }}>
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
                    value={ccRegister.first_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Last name:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last name"
                    name="last_name"
                    value={ccRegister.last_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>User name:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User name"
                    name="user_name"
                    value={ccRegister.user_name}
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
                    value={ccRegister.email}
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
                      value={ccRegister.password}
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

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Phone:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone no."
                    name="phone"
                    value={ccRegister.phone}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Street:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Street Name"
                    name="street"
                    value={ccRegister.street}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Houser Number:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter House Number"
                    name="house_nr"
                    value={ccRegister.house_nr}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Postal Code:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Postal Code"
                    name="city_code"
                    value={ccRegister.city_code}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>City:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    name="city_name"
                    value={ccRegister.city_name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Country:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    name="country"
                    value={ccRegister.country}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    <b>Company:</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company name"
                    name="company"
                    value={ccRegister.company}
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

export default CreatorRegister;
