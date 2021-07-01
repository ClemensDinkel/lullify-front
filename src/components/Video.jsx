import ReactPlayer from "react-player/lazy";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../App.css";
import { useState, useContext, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import api from "../api";
import { UserContext } from "../context/UserContext";
import { PlaylistContext } from "../context/PlaylistContext";
import { useHistory } from "react-router";
import marked from 'marked';
import { CollectionsBookmarkTwoTone, SettingsInputSvideo } from "@material-ui/icons";

const Video = ({ video, setVideo }) => {

  const [readMore, setReadMore] = useState(false);
  const { dTk, sUI } = useContext(UserContext);
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)
  const [decToken] = dTk;
  const [singleUserInfo, setSingleUserInfo] = sUI;
  let history = useHistory();
  console.log(video)

  const secToMinConverter = (n) => {
    return `${Math.floor(n / 60)}${n % 60 < 10 ? ":0" : ":"}${Math.floor(n % 60)}`
  };

  const reportButton = () => {
    if (decToken && decToken.id) {
      window.confirm("Do you want to report this video?") &&
        api
          .reportVideo(video[0]._id, { user_id: decToken.id })
          .then((res) => setVideo(res.data))
          .catch((err) => console.log(err));
    }
  };

  const unReportButton = () => {
    if (decToken && decToken.id) {
      window.confirm("Do you want to remove your report of this video?") &&
        api
          .unReportVideo(video[0]._id, { user_id: decToken.id })
          .then((res) => {
            console.log(res.data)
            console.log(video[0])
            /* setSingleUserInfo((previous) => {
              return {
                ...previous,
                favorites: res.data
              };
            }) */
          })
          .catch((err) => console.log(err));
    }
  };

  const addToFavorite = () => {
    if (decToken && decToken.id) {
      api
        .addVideoToFavorite(decToken.id, { video_id: video[0]._id })
        .then((res) => {
          console.log(res.data)
          setSingleUserInfo((previous) => {
            return {
              ...previous,
              favorites: res.data
            };
          })
        })
        .catch((err) => console.log(err));
    }
  };

  const removeFromFavorite = () => {
    if (decToken && decToken.id) {
      api
        .removeVideoFromFavorite(decToken.id, { video_id: video[0]._id })
        .then((res) => {
          console.log(res.data)
          setSingleUserInfo((previous) => {
            return {
              ...previous,
              favorites: res.data
            };
          })
        })
        .catch((err) => console.log(err));
    }
  };

  // for testing
  useEffect(() => {
    console.log(singleUserInfo)
  }, [singleUserInfo])

  const playNext = () => {
    const slicedPlaylist = autoPlaylist.slice(1)
    if (slicedPlaylist.length > 0) {
      history.push(`/player/${slicedPlaylist[0]}`)
      setAutoPlaylist(slicedPlaylist)
    }
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
              /* loop={true} */
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
                    {decToken && singleUserInfo.favorites && !singleUserInfo.favorites.some(favorite => favorite._id === video[0]._id) && (
                      <Button variant="dark" onClick={() => addToFavorite()}>
                        <AiOutlineHeart />{/* Favorite */}
                      </Button>
                    )}

                    {decToken && singleUserInfo.favorites && singleUserInfo.favorites.some(favorite => favorite._id === video[0]._id) && (
                      <Button
                        variant="dark"
                        onClick={() => removeFromFavorite()}
                      >
                        <AiTwotoneHeart /> {/* UnFavorite */}
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="dark"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {!readMore ? <b>Show More</b> : <b>Show less</b>}
                  </Button>

                  {decToken && !video[0].reportedBy.includes(decToken.id) && (
                    <Button variant="dark" onClick={() => reportButton()}>
                      <b>Report</b>
                    </Button>
                  )}
                  {decToken && video[0].reportedBy.includes(decToken.id) && (
                    <Button variant="dark" onClick={() => unReportButton()}>
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
                      <h6>Description:</h6>
                      <section dangerouslySetInnerHTML={{ __html: marked(video[0].short_description) }} />
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

