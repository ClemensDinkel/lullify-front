import { Form, FormControl, Button, Col, Image, Nav } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import "../App.css";
import { UserContext } from "../context/UserContext";
import { VideoContext } from "../context/VideoContext";
import { PlaylistContext } from "../context/PlaylistContext";
import { Link } from "react-router-dom";
import moon_image from "../images/moon2.png"
import { useHistory } from "react-router";

const Playlists = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [videos] = useContext(VideoContext);
  const [loading, setLoading] = useState(true);
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext);
  const [selectedVideo, setSelectedVideo] = useState({ video_id: null });
  const [displayedPlaylists, setDisplayedPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    user_id: null,
  });

  // get playlists on first mount
  useEffect(() => {
    if (decToken && decToken.id) updatePlaylists();
  }, []);

  // called on first mount
  const updatePlaylists = () => {
    api
      .getPlaylist(decToken.id)
      .then((res) => {
        setDisplayedPlaylists(res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  // keeps track of a newPlalist's name and user_id
  const onChangeNewPlaylist = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setNewPlaylist({
      [keyName]: value,
      user_id: decToken.id,
    });
  };

  // adds new playlist and gets new data afterwards
  const addPlaylist = (e) => {
    e.preventDefault();
    api.createPlaylist(newPlaylist)
      .then(res => {
        setDisplayedPlaylists(prev => [...prev, res.data])
        setNewPlaylist({})
      })
      .catch(err => console.log(err))
  }

  const deletePlaylist = (playlist_id) => {
    api
      .deletePlaylist(decToken.id, playlist_id)
      .then(() =>
        setDisplayedPlaylists(prev =>
          prev.filter(playlist => playlist._id !== playlist_id)));
  }

  // <<Playlist -- Videos>>

  // manages video selection for adding a video to a playlist
  const onChangeVideoSelector = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setSelectedVideo({ [keyName]: value });
  };

  // add video to a playlist
  const addVideo = (playlist_id, playlistIndex) => {
    api.addVideoToPlaylist(decToken.id, playlist_id, selectedVideo)
      .then((res) => {
        let newDP = [...displayedPlaylists]
        newDP[playlistIndex] = res.data
        setDisplayedPlaylists(newDP)
      })
      .catch(err => console.log(err))
  }

  const removeVideo = (playlist_id, playlistIndex, video_id) => {
    api.removeVideoFromPlaylist(decToken.id, playlist_id, { video_id: video_id })
    .then((res) => {
      let newDP = [...displayedPlaylists]
      newDP[playlistIndex] = res.data
      setDisplayedPlaylists(newDP)
    })
      .catch(err => console.log(err))
  }

  // run the player with the selected video
  const playPlaylist = (index) => {
    const autoPlay = displayedPlaylists[index].video_list
    let finalAutoPlay = []
    autoPlay.forEach(playlist => finalAutoPlay.push(playlist._id))
    setAutoPlaylist(finalAutoPlay)
  }

  const playSingleVideo = (id) => setAutoPlaylist([id]);

  return (
    <div className="playlists-container">
      <div className="playlists">
        <h2 className="create-playlist">Playlists</h2>
        <Form style={{ display: "flex" }} onSubmit={addPlaylist}>
          <FormControl
            type="text"
            placeholder="Create Playlist"
            className="mr-6"
            name="name"
            value={newPlaylist.name || ""}
            onChange={onChangeNewPlaylist}
            required
          />
          <Button type="submit" variant="outline-light">
            <AiOutlinePlus />
          </Button>
        </Form>
        <h1> </h1>
        {displayedPlaylists.length !== 0 ? (
          <Form style={{ width: "70%" }}>
            <h6 style={{ fontFamily: "cursive", color: "yellow" }}>
              Add Video
            </h6>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              name="video_id"
              value={selectedVideo.video_id}
              onChange={onChangeVideoSelector}
              custom
              required
            >
              <option value="">-----Select Video-----</option>
              {videos &&
                videos.map((video, videoIndex) => {
                  return (
                    <option value={video._id} key={videoIndex}>
                      {video.title}
                    </option>
                  );
                })}
            </Form.Control>
          </Form>
        ) : null}
        <div>
          <ul style={{ listStyle: "none" }}>
            {displayedPlaylists &&
              displayedPlaylists.map((playlist, playlistIndex) => {
                return (
                  <>
                    {!loading ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                          }}
                        >
                          <li
                            key={playlistIndex}
                            style={{ cursor: "pointer", color: "antiquewhite" }}
                            onClick={() => playPlaylist(playlistIndex)}
                          >
                            <Nav.Link
                              as={Link}
                              to={`/player/${
                                playlist.video_list.length > 0
                                  ? playlist.video_list[0]._id
                                  : ""
                              }`}
                            >
                              <h5
                                style={{
                                  color: "antiquewhite",
                                  fontFamily: "cursive",
                                }}
                              >
                                {playlist.name}
                              </h5>
                            </Nav.Link>
                          </li>
                          <Button
                            type="button"
                            variant="outline-light"
                            onClick={(e) => {
                              window.confirm(
                                `Do you really want to delete ${playlist.name}?`
                              ) && deletePlaylist(playlist._id);
                            }}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                        <div>
                          <ul>
                            {playlist.video_list &&
                              playlist.video_list.map(
                                (listVideo, listVideoIndex) => {
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <li
                                        key={listVideoIndex}
                                        style={{
                                          color: "antiquewhite",
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                        onClick={() =>
                                          playSingleVideo(listVideo._id)
                                        }
                                      >
                                        <Nav.Link
                                          as={Link}
                                          to={`/player/${listVideo._id}`}
                                        >
                                          <h6 style={{ color: "antiquewhite" }}>
                                            {listVideo.title}
                                          </h6>
                                        </Nav.Link>
                                      </li>
                                      <Button
                                        type="button"
                                        variant="outline-light"
                                        onClick={() => { removeVideo(playlist._id, playlistIndex, listVideo._id); }}
                                      >
                                        <MdDelete />
                                      </Button>
                                    </div>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                        <div>
                          <Form className="d-flex">
                            <Button
                              type="button"
                              variant="outline-light"
                              onClick={(e) => {
                                e.preventDefault();
                                if (selectedVideo.video_id === null)
                                  return alert('Select Video')
                                addVideo(playlist._id, playlistIndex);
                              }}
                            >
                              <AiOutlinePlus />
                            </Button>
                          </Form>
                        </div>
                      </div>
                    ) : (
                      <p>Loading..</p>
                    )}
                  </>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="moon-image">
        <Image src={moon_image} alt="moon" width="50%"></Image>
      </div>
    </div>
  );
};

export default Playlists;
