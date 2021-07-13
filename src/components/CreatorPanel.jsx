import "../App.css";
import ContentList from "./ContentList";
import AddContent from "./AddContent";
import { UserContext } from "../context/UserContext";
import { QueryContext } from '../context/QueryContext'
import { useContext, useState, useEffect } from "react";
import api from "../api";

const CreatorPanel = () => {
  const { dTk } = useContext(UserContext)
  const [decToken, setDecToken] = dTk;
  const [uploaderVideos, setUploaderVideos] = useState([]);
  const { ft, lg } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [lang, setLang] = lg

  useEffect(() => {
    setFilter("")
    setLang("")
  }, [])

  useEffect(() => {
    if (decToken && decToken.id) {
      api
        .getUploaderAllVideos(decToken.id)
        .then((res) => {
          setUploaderVideos(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [decToken]);

  return (
    <>
      {(dTk && dTk[0]) && (dTk[0].role === "admin" || dTk[0].role === "content_creator") ?
        <div className="creator-panel main-container">
          <ContentList uploaderVideos={uploaderVideos} setUploaderVideos={setUploaderVideos} decToken={decToken} />
          <AddContent setUploaderVideos={setUploaderVideos} />
        </div>
        : <p>Access denied</p>
      }
    </>
  );
};

export default CreatorPanel;
