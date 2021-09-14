import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import PermanentPlaylistsSection from "../Home/PermanentPlaylistsSection";
import TemporaryPlaylistSection from "../Home/TemporaryPlaylistSection";
import Video from "./Video";
import "../../App.css";
import api from "../../api";
import { UserContext } from "../../context/UserContext";
import { PlaylistContext } from "../../context/PlaylistContext";

const Player = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const { ppl } = useContext(PlaylistContext);
  const [playedList] = ppl;

  useEffect(() => {
    api
      .getVideoById(id)
      .then((res) => setVideo(res.data)) //array!!!
      .catch((err) => console.log(err));
  }, [playedList]);

  return (
    <div className="player-container main-container">
      {video ? <Video video={video} setVideo={setVideo} /> : <p>Loading..</p>}

      {decToken && decToken.id ?
        <PermanentPlaylistsSection /> :
        <TemporaryPlaylistSection />}
    </div>
  );
};

export default Player;
