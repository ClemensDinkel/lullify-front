import { Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap"


const YoutubeAutofill = ({ getFromYTApi, query, handleQueryString }) => (
  <div>
    <p>Optional: Autofill form using Youtube API</p>
    <Form onSubmit={getFromYTApi}>
      <OverlayTrigger
        key="top"
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="tooltip-top">
            Enter keywords to search video from youtube.
          </Tooltip>
        }
      >
        <Form.Control
          type="text"
          placeholder="Get Data from Youtube API"
          name="ytapi"
          value={query}
          onChange={handleQueryString}
          required
        />
      </OverlayTrigger>
      <Button variant="outline-secondary" type="submit">
        <b>Ask Youtube</b>
      </Button>

    </Form>
  </div>
)

export default YoutubeAutofill