import { Form } from "react-bootstrap"

const Email = ({newLogin, onChange}) => (
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
)
export default Email