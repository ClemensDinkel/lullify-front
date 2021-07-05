import { useContext, useEffect } from "react";
import Previews from "./Previews";
import Playlists from "./Playlists";
import TemporaryPlaylist from "./TemporaryPlaylist";
import { UserContext } from "../context/UserContext";
import { QueryContext } from "../context/QueryContext";
import { VideoContext } from "../context/VideoContext";
import "../App.css";
import api from "../api";

const Home = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const { ft } = useContext(QueryContext)
  const [filter, setFilter] = ft
  const [videos, setVideos] = useContext(VideoContext)

  useEffect(() => {
    console.log("running new query on home")
    setFilter("")
    api.getVideos()
      .then(res => {
        setVideos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  /* useEffect(() => {
    setVideos(videos)
  }, []) */

  return (
    <div className="main-container home-container">
      <Previews />
      {decToken && decToken.id ? <Playlists /> : <TemporaryPlaylist />}
    </div>
  );
};

export default Home;
