import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { VideoContext } from "../../../context/VideoContext";
import api from "../../../api";
import Input from "../Input";
import formList from "../formList";

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
      {formList.map(inputField =>
        <Input
          {...inputField}
          value={videoToAdd[inputField.name] ?? ""}
          onChange={onChange}
        />
      )}
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