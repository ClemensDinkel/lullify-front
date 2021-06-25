import { useParams } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { useHistory } from "react-router-dom"
import {useState, useEffect, useContext} from "react"
import api from "../api"
import { Form, Button, Card, Col } from "react-bootstrap";

const EditVideo = () => {
  const {video_id} = useParams()
  const { dTk } = useContext(UserContext)
  const [decToken] = dTk

  let history = useHistory();
  console.log(video_id)

  const [getVideo, setGetVideo] = useState({})

  useEffect(() => {
    api.getVideoById(video_id)
    .then(res => {
      console.log(res.data)
      const videoInfo = res.data[0]
      console.log(videoInfo)
      setGetVideo({
        title: videoInfo.title,
        artist: videoInfo.artist,
        video_url: videoInfo.video_url,
        video_img_url: videoInfo.video_img_url,
        short_description: videoInfo.short_description,
        duration: videoInfo.duration,
        languages: videoInfo.languages,
        tags: videoInfo.tags,
        errors: {}
      })
    })
    .catch(err => console.log(err))
  },[]) 

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setGetVideo((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  }

  const updateVideo = (e) => {
    e.preventDefault();
    api.updateUploaderVideo(decToken.id, video_id, getVideo)
      .then(() => {
        alert("Your video has been successfully updated")
        history.push(`/creator`)})
      .catch(err => console.log(err))
  };
  


  return(
    <div style={{ display: "flex", justifyContent: "center" }}>
        <Card bg="light" style={{ flexGrow: "1", mixWidth: "30rem", textAlign: "left" }}>
          <Card.Body>
            <Form onSubmit={updateVideo}>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Video Title</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    value={getVideo ? getVideo.title : ""}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Artist</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Artist"
                    name="artist"
                    value={getVideo ? getVideo.artist : ""}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Video URL</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter url"
                    name="video_url"
                    value={getVideo ? getVideo.video_url : ""}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Image URL</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter url for video image"
                    name="video_img_url"
                    value={getVideo ? getVideo.video_img_url : ""}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="ControlTextarea1">
                  <Form.Label>
                    <b>Video Description</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Short Description"
                    name="short_description"
                    value={getVideo ? getVideo.short_description : ""}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Video Duration</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter duration in secs"
                    name="duration"
                    value={getVideo ? getVideo.duration : ""}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Languages</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="English, German, Hindi etc.."
                    name="languages"
                    value={getVideo ? getVideo.languages : ""}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>
                    <b>Videos Tags</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kinder, Children, Fun etc.."
                    name="tags"
                    value={getVideo ? getVideo.tags : ""}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
              
                <Button variant="outline-secondary" type="submit">
                  <b>Submit Changes</b>
                </Button>
              <Button variant="outline-secondary" type="button" onClick={() => { history.push('/creator') }}>
                <b>Cancel</b>
              </Button>
            </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
  )
}

export default EditVideo;