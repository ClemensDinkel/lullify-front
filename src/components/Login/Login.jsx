import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import "../../App.css";
import api from "../../api";
import { UserContext } from '../../context/UserContext'
import Email from "./Email"
import Password from "./Password";
import Buttons from "./Buttons";

const Login = () => {
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
    <div className="main-container" style={{ display: "block" }} >
      <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "10px" }}>
        <Card bg="light" style={{ flexGrow: "1", maxWidth: "30rem", height: "fit-content", textAlign: "left" }}>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Label>
                <span style={{ color: "red" }}>*</span> Fields are required
              </Form.Label>
              <Email newLogin={newLogin} onChange={onChange} />
              <Password newLogin={newLogin} onChange={onChange} />
              <Buttons />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
