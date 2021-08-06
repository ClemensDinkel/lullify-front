import "../App.css";
import ContentList from "./ContentList";
import AddContent from "./AddContent";
import { UserContext } from "../context/UserContext";
import { QueryContext } from '../context/QueryContext'
import { useContext, useState, useEffect } from "react";
import api from "../api";
import { Spinner } from "react-bootstrap";

const CreatorPanel = () => {
  const { dTk } = useContext(UserContext)
  const [decToken] = dTk;
  const [uploaderVideos, setUploaderVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false)
  const { ft, lg } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [lang, setLang] = lg

  useEffect(() => {
    setFilter("")
    setLang("")
    setVideosLoaded(false)
    if (decToken && decToken.id) {
      api
        .getUploaderAllVideos(decToken.id)
        .then((res) => {
          setVideosLoaded(true)
          setUploaderVideos(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [decToken])

  return (
    <div className="main-container">
      {(dTk && dTk[0]) && (dTk[0].role === "admin" || dTk[0].role === "content_creator") ?
        videosLoaded ?
          <div className="creator-panel main-container">
            <ContentList uploaderVideos={uploaderVideos} setUploaderVideos={setUploaderVideos} decToken={decToken} />
            <AddContent setUploaderVideos={setUploaderVideos} />
          </div> :
          <div>
            <Spinner animation="border" role="status" variant="light" style={{ height: "100px", width: "100px" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div> :
        <p>Access denied</p>
      }
    </div>
  );
};

export default CreatorPanel;
