import { useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../../../api";
import { Form, Card, } from "react-bootstrap";
import Input from "../Input";
import formList from "../formList";
import Buttons from "../Buttons";

const EditVideo = () => {
  const { video_id } = useParams();
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [getVideo, setGetVideo] = useState({});
  let history = useHistory();

  useEffect(() => {
    api
      .getVideoById(video_id)
      .then((res) => {
        const videoInfo = res.data[0];
        setGetVideo({
          title: videoInfo.title,
          artist: videoInfo.artist,
          video_url: videoInfo.video_url,
          video_img_url: videoInfo.video_img_url,
          short_description: videoInfo.short_description,
          duration: videoInfo.duration,
          languages: videoInfo.languages.join(", "),
          tags: videoInfo.tags,
          errors: {},
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setGetVideo((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const updateVideo = (e) => {
    e.preventDefault();
    const sendVideo = { ...getVideo }
    sendVideo.languages = sendVideo.languages.toLowerCase().replace(/ /g, '').split(",")
    /* sendVideo.tags = sendVideo.tags.replace(/ /g,'').split(",") */
    window.confirm("Do you want to update video information?") &&
      api
        .updateUploaderVideo(decToken.id, video_id, sendVideo)
        .then(() => {
          history.push(`/creatorpanel`);
        })
        .catch(err => alert(err.message))
  };

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center", width: "50%" }}>
        <Card
          bg="light"
          style={{ flexGrow: "1", mixWidth: "30rem", height: "fit-content", textAlign: "left" }}
        >
          <Card.Body>
            <Form onSubmit={updateVideo}>
              {formList.map(inputField =>
                <Input
                  {...inputField}
                  value={getVideo[inputField.name] ?? ""}
                  onChange={onChange}
                />
              )}
              <Buttons />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditVideo;
