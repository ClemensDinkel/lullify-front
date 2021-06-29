import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Playlists from "./Playlists";
import TemporaryPlaylist from "./TemporaryPlaylist";
import Video from "./Video";
import "../App.css";
import api from "../api";
import { UserContext } from "../context/UserContext";
import { PlaylistContext } from "../context/PlaylistContext";

const Player = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [playlist] = useContext(PlaylistContext)

  console.log(video);

  useEffect(() => {
    console.log("getting new video fired")
    api
      .getVideoById(id)
      .then((res) => setVideo(res.data)) //array!!!
      .catch((err) => console.log(err));
  }, [playlist]);

  // in video on end -> playlist.shift() ?      n nn                               

  return (
    <>
      <div className="player-container">
        {video ? <Video video={video} setVideo={setVideo} /> : <p>Loading..</p>}
        {decToken && decToken.id ? <Playlists /> : <TemporaryPlaylist />}
      </div>
    </>
  );
};

export default Player;
