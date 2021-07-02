import {
  Form,
  Button,
  Image,
  Card,
  Col,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { VideoContext } from "../context/VideoContext";
import api from "../api";
import { BsQuestionOctagonFill } from "react-icons/bs";
import "../App.css";

const AddContent = ({setUploaderVideos}) => {
  let history = useHistory();
  const { dTk } = useContext(UserContext);
  const [decToken, setDecToken] = dTk;
  const [videos, setVideos] = useContext(VideoContext)
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
  });

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setAddVideo((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const addNewVideo = (e) => {
    e.preventDefault();
    console.log(addVideo.languages)
    const newVideo = {
      title: addVideo.title,
      artist: addVideo.artist,
      video_url: addVideo.video_url,
      video_img_url: addVideo.video_img_url,
      short_description: addVideo.short_description,
      duration: addVideo.duration,
      uploader_id: decToken.id,
      languages: addVideo.languages.replace(/ /g,'').split(","),
      tags: addVideo.tags.replace(/ /g,'').split(",")
    };
    console.log(newVideo.languages)
    api.addVideos(newVideo).then((res) => {
      alert("Video has been added");
      setAddVideo({
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
      });
      setVideos(prev => [...prev, res.data])
      setUploaderVideos(prev => [...prev, res.data])
    });
  };

  return (
    <div className="add-content">
      <h3 style={{ fontFamily: "cursive", color: "white" }}>Add Content</h3>

      <div
        style={{ display: "flex", justifyContent: "center", maxWidth: "100%", margin: ".4rem" }}
      >
        <Card
          bg="light"
          style={{
            flexGrow: "1",
            width: "100%",
            height: "fit-content",
            textAlign: "left",
          }}
        >
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
                    <span style={{ color: "red" }}>*</span>
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
                      required
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>
                    <b>Languages</b>
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
                      />
                    </OverlayTrigger>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <a
                          href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
                          target="_blank"
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
                        Enter tags by separating each of them with comma ','.
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      type="text"
                      placeholder="Kinder, Children, Fun etc.."
                      name="tags"
                      value={addVideo.tags}
                      onChange={onChange}
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AddContent;
