const AddForm = () => {
  return (
    <Form onSubmit={addNewVideo}>
      <Form.Label>
        <span style={{ color: "red" }}>*</span> Fields are required
      </Form.Label>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Video Title</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <OverlayTrigger
            key="top"
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip-top">
                Video Title should have maximum 40 characters.
              </Tooltip>
            }
          >
            <Form.Control
              type="text"
              placeholder="Enter Title"
              name="title"
              value={addVideo.title}
              onChange={onChange}
              maxlength="40"
              required
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Artist</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <OverlayTrigger
            key="top"
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip-top">
                Artist name should have maximum 20 characters.
              </Tooltip>
            }
          >
            <Form.Control
              type="text"
              placeholder="Enter Artist"
              name="artist"
              value={addVideo.artist}
              onChange={onChange}
              maxlength="20"
              required
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Video URL</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="url"
            pattern="https://.*"
            placeholder="Enter url"
            name="video_url"
            value={addVideo.video_url}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Image URL</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="url"
            pattern="https://.*"
            placeholder="Enter url for video image"
            name="video_img_url"
            value={addVideo.video_img_url}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="ControlTextarea1">
          <Form.Label>
            <b>Video Description</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Short Description"
            name="short_description"
            value={addVideo.short_description}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Video Duration</b>
          </Form.Label>
          <OverlayTrigger
            key="top"
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip-top">
                Enter duration in seconds
              </Tooltip>
            }
          >
            <Form.Control
              type="number"
              placeholder="Enter duration in secs"
              name="duration"
              value={addVideo.duration}
              onChange={onChange}
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Languages</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <InputGroup className="mb-2">
            <OverlayTrigger
              key="top"
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="tooltip-top">
                  Enter languages code by separating each of them with
                  comma ',' . For code use the hint.
                </Tooltip>
              }
            >
              <Form.Control
                type="text"
                placeholder="EN, DE, HI etc.."
                name="languages"
                value={addVideo.languages}
                onChange={onChange}
                required
              />
            </OverlayTrigger>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <a
                  href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black" }}
                >
                  <BsQuestionOctagonFill />
                </a>
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>
            <b>Videos Tags</b>
          </Form.Label>
          <OverlayTrigger
            key="top"
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip-top">
                Enter tags by separating each of them with comma ',' or whitespace.
              </Tooltip>
            }
          >
            <Form.Control
              type="text"
              placeholder="Kinder, Children, Fun etc.."
              name="tags"
              value={addVideo.tags}
              onChange={onChange}
              maxLength="40"
            />
          </OverlayTrigger>
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
            setAddVideo("");
            window.location.reload();
            history.push("/creator");
          }}
        >
          <b>Cancel</b>
        </Button>
      </Form.Row>
    </Form>
  )
}