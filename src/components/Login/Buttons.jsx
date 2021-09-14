import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const Buttons = () => {
  let history = useHistory()

  return (
    <Form.Row
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px",
      }}
    >
      <Button variant="outline-secondary" type="submit">
        <b>Login</b>
      </Button>
      <Button
        variant="outline-secondary"
        type="button"
        onClick={() => {history.push("/")}}
      >
        <b>Cancel</b>
      </Button>
    </Form.Row>
  )
}

export default Buttons