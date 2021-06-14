import { Card, Col, Form, Button } from "react-bootstrap";
import { register } from "./AuthFunctions";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const CreatorRegister = () => {
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
      firs_tname: ccRegister.firstname,
      last_name: ccRegister.lastname,
      user_name: ccRegister.user_name,
      email: ccRegister.email,
      password: ccRegister.password,
      phone: ccRegister.phone,
      city_code: ccRegister.city_code,
      city_name: ccRegister.city_name,
      country: ccRegister.country,
      company: ccRegister.company,
      requested_to_be_cc: true,
    };

    register(queryString.stringify(newUser)).then((res) => {
      history.push(`/login`);
    });
  };

  return (
    <>
      <p>CreratorRegister</p>
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First name"
                  name="first_name"
                  value={ccRegister.first_name}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last name"
                  name="last_name"
                  value={ccRegister.last_name}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User name"
                  name="user_name"
                  value={ccRegister.user_name}
                  onChange={onChange}
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
                  value={ccRegister.email}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={ccRegister.password}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone no."
                  name="phone"
                  value={ccRegister.phone}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Postal Code"
                  name="city_code"
                  value={ccRegister.city_code}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city_name"
                  value={ccRegister.city_name}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  value={ccRegister.country}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company name"
                  name="company"
                  value={ccRegister.company}
                  onChange={onChange}
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
    </>
  );
};

export default CreatorRegister;
