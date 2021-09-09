import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const Buttons = ({emptyVideo, setVideoToAdd}) => {
  let history = useHistory()
  const submit = history.location.pathname === "/creatorpanel" ? "Submit" : "Submit Changes"

  return (
    <Form.Row
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px",
      }}
    >
      <Button variant="outline-secondary" type="submit">
        <b>{submit}</b>
      </Button>
      {history.location.pathname === "/creatorpanel" ?
        <Button
          variant="outline-secondary"
          type="button"
          onClick={() => { setVideoToAdd(emptyVideo) }}
        >
          <b>Clear</b>
        </Button> :
        <Button
          variant="outline-secondary"
          type="button"
          onClick={() => { history.push("/creatorpanel") }}
        >
          <b>Cancel</b>
        </Button>
      }
    </Form.Row>
  )
}

export default Buttons