import {
  Form,
  Button,
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

const AddContent = ({ setUploaderVideos }) => {
  let history = useHistory();
  const { dTk } = useContext(UserContext);
  const [decToken, setDecToken] = dTk;
  const [videos, setVideos] = useContext(VideoContext)
  const [q, setQ] = useState("")
  const [yTHits, setYTHits] = useState([])
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

  const handleQ = (e) => {
    setQ(e.target.value)
  }

  const getFromYTApi = (e) => {
    e.preventDefault()
    api.getVideoFromYTApi(q)
      .then(res => {
        setYTHits(res.data)
      })
      .catch(err => console.log(err))
  }

  const autoFill = (index) => {
    const selected = yTHits[index]
    if (selected.snippet.title.length > 40 && selected.snippet.channelTitle.length > 20) {
      alert("Video Title, Artist or Name is too long. Please make it shorter before submitting video")
    }

    setAddVideo({
      title: selected.snippet.title,
      artist: selected.snippet.channelTitle,
      video_url: `https://www.youtube.com/watch?v=${selected.id.videoId}`,
      video_img_url: selected.snippet.thumbnails.high.url,
      short_description: selected.snippet.description,
      duration: 0,
      languages: "",
      tags: "",
      errors: {},
    })
    setYTHits([])
    setQ("")
  }

  /* useEffect(() => {
    console.log(yTHits)
     console.log(yTHits[0].snippet.title)
  }, [yTHits])

    useEffect(() => {
    console.log(addVideo)
  }, [addVideo]) */

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
    const newVideo = {
      title: addVideo.title,
      artist: addVideo.artist,
      video_url: addVideo.video_url,
      video_img_url: addVideo.video_img_url,
      short_description: addVideo.short_description,
      duration: addVideo.duration,
      uploader_id: decToken.id,
      languages: addVideo.languages.toLowerCase().replace(/ /g, '').split(","),
      tags: addVideo.tags.replace(/ /g, '')
    };
    api.addVideos(newVideo)
      .then((res) => {
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
        if (res.data.name !== "ValidationError") {
          setVideos(prev => [...prev, res.data])
          setUploaderVideos(prev => [...prev, res.data])
          alert("Video has been added");
        } else {
          alert("This video has already been uploaded to Lullifey")
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="add-content">
      <h3 style={{ fontFamily: "cursive", color: "white" }}><b>Add new Video</b></h3>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100%", margin: ".4rem" }}
      >
        <Card
          bg="light"
          style={{
            flexGrow: "1",
            maxWidth: "30rem",
            height: "fit-content",
            textAlign: "left",
          }}
        >
          <Card.Body>
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
                  value={q}
                  onChange={handleQ}
                  required
                />
              </OverlayTrigger>
              <Button variant="outline-secondary" type="submit">
                <b>Ask Youtube</b>
              </Button>

            </Form>
            <br />
            {yTHits[0] ?
              <div>
                <h5>Select a video</h5>
                {yTHits.map((hit, hitIndex) => {
                  return (
                    <p onClick={() => autoFill(hitIndex)} style={{ cursor: "pointer" }}>
                      {hit.snippet.title}
                    </p>
                  )
                })}

              </div> : null
            }
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
          </Card.Body>
        </Card>
      </div >
    </div >
  );
};

export default AddContent;
