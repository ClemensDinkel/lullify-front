import "../../App.css";
import ContentManager from "./ContentManager/ContentManager";
import AddContent from "./AddContent/AddContent";
import { UserContext } from "../../context/UserContext";
import { QueryContext } from '../../context/QueryContext'
import { useContext, useState, useEffect } from "react";
import api from "../../api";
import LoadingSpinner from "../LoadingSpinner";

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
          <div className="main-container creator-panel">
            <ContentManager uploaderVideos={uploaderVideos} setUploaderVideos={setUploaderVideos} decToken={decToken} />
            <AddContent setUploaderVideos={setUploaderVideos} />
          </div> :
          <LoadingSpinner/> :
        <p style={{color: "white"}}>Access denied</p>
      }
    </div>
  );
};

export default CreatorPanel;
