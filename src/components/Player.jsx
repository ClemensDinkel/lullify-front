import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Playlists from "./Playlists";
import LocalPlaylists from "./LocalPlaylists";
import Video from "./Video";
import "../App.css";
import api from "../api";
import { UserContext } from "../context/UserContext";

const Player = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;

  console.log(video);

  useEffect(() => {
    api
      .getVideoById(id)
      .then((res) => setVideo(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="player-container">
        {video ? <Video video={video} setVideo={setVideo} /> : <p>Loading..</p>}
        {decToken && decToken.id ? <Playlists /> : <LocalPlaylists />}
      </div>
    </>
  );
};

export default Player;
