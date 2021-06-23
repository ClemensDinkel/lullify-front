import { Form, Button, Image, Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import api from "../api"

const AddContent = () => {
  let history = useHistory()

  const {dTk} = useContext(UserContext)
  const [decToken, setDecToken] = dTk

  const [addVideo, setAddVideo] = useState({
    title: "",
    artist: "",
    video_url: "",
    video_img_url: "",
    short_description: "",
    duration: 0,
    uploader_id: null,
    languages: "",
    tags: "",
    errors: {},
  })

  console.log(addVideo)

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setAddVideo((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  }

  const addNewVideo = (e) => {
    e.preventDefault();

    const newVideo = {
      title: addVideo.title,
    artist: addVideo.artist,
    video_url: addVideo.video_url,
    video_img_url: addVideo.video_img_url,
    short_description: addVideo.short_description,
    duration: addVideo.duration,
    uploader_id: decToken.id,
    languages: addVideo.languages,
    tags: addVideo.tags,
    }

    api.addVideos(newVideo)
    .then(() => {
      console.log(newVideo)
      alert("Video has been added")
      history.push('/creator')
    })
  }
  


  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h3>Add Content</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ flexGrow: "1", minWidth: "30rem", textAlign: "left" }}>
          <Card.Body>
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
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    value={addVideo.title}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>Artist</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Artist"
                    name="artist"
                    value={addVideo.artist}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>Video URL</b>
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
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
                    type="text"
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
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter duration in secs"
                    name="duration"
                    value={addVideo.duration}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>Languages</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="English, German, Hindi etc.."
                    name="languages"
                    value={addVideo.languages}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>Videos Tags</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kinder, Children, Fun etc.."
                    name="tags"
                    value={addVideo.tags}
                    onChange={onChange}
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="primary" type="button" onClick={() => { history.push('/creator') }}>
                Cancel
              </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddContent;
