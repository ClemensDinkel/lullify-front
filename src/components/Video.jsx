import ReactPlayer from "react-player/lazy";
import { Container, Col, Row, Button, Accordion } from "react-bootstrap";
import "../App.css";
import { useState, useContext, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import api from "../api";
import { UserContext } from "../context/UserContext";
import { PlaylistContext } from "../context/PlaylistContext";
import { AccordionDetails } from "@material-ui/core";
import { useHistory } from "react-router";

const Video = ({ video,setVideo }) => {
  console.log(video);
  const [readMore, setReadMore] = useState(false);
  const { dTk, sUI } = useContext(UserContext);
  const [playlist, setPlaylist] = useContext(PlaylistContext)
  const [decToken] = dTk;
  const [singleUserInfo] = sUI;
  let history = useHistory();

  console.log(singleUserInfo)

  const secToMinConverter = (n) => {
    /* return n / 60; */ // old formula
    return `${Math.floor(n/60)}${n%60<10 ? ":0" : ":"}${Math.floor(n%60)}`
  };

  const reportButton = () => {
    if (decToken && decToken.id) {
      window.confirm("Do you want to report this video?") &&
      api
        .reportVideo(video[0]._id, { user_id: decToken.id })
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };

  const unReportButton = () => {
    if (decToken && decToken.id) {
      window.confirm("Do you want to unreport this video?") &&
      api
        .unReportVideo(video[0]._id, { user_id: decToken.id })
        .then(() => {
          window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };

  const addToFavorite = () => {
    if (decToken && decToken.id) {
      window.confirm("Do you want to add to favourites?") &&
      api
        .addVideoToFavorite(decToken.id, { video_id: video[0]._id })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };

  const removeFromFavorite = () => {
    if (decToken && decToken.id) {
      window.confirm("Do you want to remove from favourites?") &&
      api
        .removeVideoFromFavorite(decToken.id, { video_id: video[0]._id })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };
  const playNext = () => {
    setPlaylist(prev=> {
      prev.shift()
      console.log(prev)
    })
    console.log(playlist[0])
    if (playlist.length > 0) history.push(`/player/${playlist[0]}`)
  }

  return (
    <>
      <div className="video-container">
        <Container>
          <Row>
            <Col>
              <ReactPlayer
                controls={true}
                className="react-player"
                url={video[0].video_url}
                muted={false}
                playing={true}
                width="100%"
                height="600px"
                onEnded={playNext}
                loop={true}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="video-description">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h3>{video[0].title}</h3>
                    <p>{video[0].artist}</p>
                  </div>
                  <div>
                  {singleUserInfo.favorites && !singleUserInfo.favorites.some(favorite => favorite._id === video[0]._id) && (
                      <Button variant="light" onClick={() => addToFavorite()}>
                        <AiOutlineHeart />
                      </Button>
                    )}

                    {singleUserInfo.favorites && singleUserInfo.favorites.some(favorite => favorite._id === video[0]._id) && (
                      <Button
                        variant="light"
                        onClick={() => removeFromFavorite()}
                      >
                       <AiTwotoneHeart /> 
                      </Button>
                    )}
                  </div>
                </div>
                 <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="light"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {!readMore ? <b>Show More</b> : <b>Show less</b>}
                  </Button>

                  {decToken && !video[0].reportedBy.includes(decToken.id) && (
                    <Button variant="light" onClick={() => reportButton()}>
                      <b>Report</b>
                    </Button>
                  )}
                  {decToken && video[0].reportedBy.includes(decToken.id) && (
                    <Button variant="light" onClick={() => unReportButton()}>
                      <b>Unreport</b>
                    </Button>
                  )}
                </div>
                <div>
                  {readMore ? (
                    <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                      <h6>
                        Duration: {secToMinConverter(video[0].duration)} mins
                      </h6>
                      <p>Description: {video[0].short_description}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Video;

