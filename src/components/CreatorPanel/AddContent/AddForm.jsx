import {
  Form,
  Button,
  Col,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { VideoContext } from "../../../context/VideoContext";
import api from "../../../api";
import Input from "./Input";

const AddForm = ({ videoToAdd, setVideoToAdd, setUploaderVideos }) => {

  const emptyVideo = {
    title: "",
    artist: "",
    video_url: "",
    video_img_url: "",
    short_description: "",
    duration: 0,
    uploader_id: null,
    languages: "",
    tags: "",
    errors: {}
  }
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [videos, setVideos] = useContext(VideoContext)

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setVideoToAdd((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const addNewVideo = (e) => {
    e.preventDefault();
    const newVideo = {
      title: videoToAdd.title,
      artist: videoToAdd.artist,
      video_url: videoToAdd.video_url,
      video_img_url: videoToAdd.video_img_url,
      short_description: videoToAdd.short_description,
      duration: videoToAdd.duration,
      uploader_id: decToken.id,
      languages: videoToAdd.languages.toLowerCase().replace(/ /g, '').split(","),
      tags: videoToAdd.tags.replace(/ /g, '')
    };
    api.addVideos(newVideo)
      .then((res) => {
        setVideoToAdd({
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
    <Form onSubmit={addNewVideo}>
      <Form.Label>
        <span style={{ color: "red" }}>*</span> Fields are required
      </Form.Label>
      <Input
        name={"title"}
        description={"Video Title"}
        type=/* "text" */ {undefined}
        required={true}
        value={videoToAdd.title}
        maxlength="40"
        as=/* {undefined} */ "textarea"
        tooltip="Video Title should have maximum 40 characters."
        placeholder="Enter Title"
        pattern={undefined}
        rows={3} /* {undefined} */
        onChange={onChange}
      />
      {/* <Form.Row>
        <Form.Group as={Col}>
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
              value={videoToAdd.title}
              onChange={onChange}
              maxlength="40"
              required
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
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
              value={videoToAdd.artist}
              onChange={onChange}
              maxlength="20"
              required
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>
            <b>Video URL</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="url"
            pattern="https://.*"
            placeholder="Enter url"
            name="video_url"
            value={videoToAdd.video_url}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>
            <b>Image URL</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="url"
            pattern="https://.*"
            placeholder="Enter url for video image"
            name="video_img_url"
            value={videoToAdd.video_img_url}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>
            <b>Video Description</b>
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Short Description"
            name="short_description"
            value={videoToAdd.short_description}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
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
              value={videoToAdd.duration}
              onChange={onChange}
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
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
                value={videoToAdd.languages}
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
        <Form.Group as={Col}>
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
              value={videoToAdd.tags}
              onChange={onChange}
              maxLength="40"
            />
          </OverlayTrigger>
        </Form.Group>
      </Form.Row> */}
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
          onClick={() => { setVideoToAdd(emptyVideo) }}
        >
          <b>Clear</b>
        </Button>
      </Form.Row>
    </Form>
  )
}

export default AddForm