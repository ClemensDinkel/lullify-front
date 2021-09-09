import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../../api";
import "../../../App.css";
import YoutubeAutofill from "./YoutubeAutofill";
import YoutubeHits from "./YoutubeHits";
import AddForm from "./AddForm"


const AddContent = ({ setUploaderVideos }) => {
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
  const [query, setQuery] = useState("")
  const [yTHits, setYTHits] = useState([])
  const [videoToAdd, setVideoToAdd] = useState(emptyVideo);

  const handleQueryString = (e) => setQuery(e.target.value)

  const getFromYTApi = (e) => {
    e.preventDefault()
    api.getVideoFromYTApi(query)
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

    setVideoToAdd({
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
    setQuery("")
  }

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
            <YoutubeAutofill
              getFromYTApi={getFromYTApi}
              query={query}
              handleQueryString={handleQueryString}
            />
            <br />
            {yTHits.length > 0 ?
              <YoutubeHits
                yTHits={yTHits}
                autoFill={autoFill}
              /> :
              null
            }
            <AddForm
              videoToAdd={videoToAdd}
              setVideoToAdd={setVideoToAdd}
              setUploaderVideos={setUploaderVideos}
            />
          </Card.Body>
        </Card>
      </div >
    </div >
  );
};

export default AddContent;
