import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap"
import { BiShow, BiHide } from "react-icons/bi"
const Password = ({newLogin, onChange}) => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
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
  )
}
export default Password