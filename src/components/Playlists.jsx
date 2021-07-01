import { Form, FormControl, Button, Image, Alert } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import "../App.css";
import { UserContext } from "../context/UserContext";
import { VideoContext } from "../context/VideoContext";
import { PlaylistContext } from "../context/PlaylistContext";
import { Link } from "react-router-dom";

const Playlists = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [videos] = useContext(VideoContext);
  const [loading, setLoading] = useState(true);
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)
  const [selectedVideo, setSelectedVideo] = useState({ video_id: null });
  const [displayedPlaylists, setDisplayedPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    user_id: null,
  });

  // get playlists on first mount
  useEffect(() => {
    if (decToken && decToken.id) getPlaylists()
  }, []);

  // called on first mount and whenever new playlist is added or changed
  const getPlaylists = () => {
    api
      .getPlaylist(decToken.id)
      .then((res) => {
        setDisplayedPlaylists(res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }

  // keeps track of a newPlalist's name and user_id
  const onChangeNewPlaylist = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setNewPlaylist({
      [keyName]: value,
      user_id: decToken.id
    });
  };

  // adds new playlist and gets new data afterwards
  const addPlaylist = (e) => {
    e.preventDefault();
    api.createPlaylist(newPlaylist)
      .then(() => {
        setNewPlaylist({});
        getPlaylists();
      });
  };

  const deletePlaylist = (playlist_id) => {
    api
      .deletePlaylist(decToken.id, playlist_id)
      .then(() => getPlaylists());
  }

  // <<Playlist -- Videos>>

  // manages video selection for adding a video to a playlist
  const onChangeVideoSelector = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setSelectedVideo({ [keyName]: value })
  };

  // add video to a playlist
  const addVideo = (playlist_id) => {
    console.log("adding...")
    api.addVideoToPlaylist(decToken.id, playlist_id, selectedVideo)
      .then(() => getPlaylists())
      .catch((err) => alert("video can only be added once to the same playlist"))
  }

  const removeVideo = (playlist_id, video_id) => {
    api.removeVideoFromPlaylist(decToken.id, playlist_id,{ video_id: video_id })
      .then(() => getPlaylists());
  }

  // run the player with the selected video
  const playPlaylist = (index) => {
    const autoPlay = displayedPlaylists[index].video_list
    let finalAutoPlay = []
    autoPlay.forEach(playlist => finalAutoPlay.push(playlist._id))
    console.log(finalAutoPlay)
    setAutoPlaylist(finalAutoPlay)
  }

  const playSingleVideo = (id) => setAutoPlaylist([id])

  return (
    <div className="playlists">
      <h2>Playlists</h2>
      <Form className="d-flex" onSubmit={addPlaylist}>
        <FormControl
          type="text"
          placeholder="Create Playlist"
          className="mr-6"
          name="name"
          value={newPlaylist.name || ""}
          onChange={onChangeNewPlaylist}
          required
        />
        <Button type="submit" variant="outline-secondary">
          <AiOutlinePlus />
        </Button>
      </Form>
      {displayedPlaylists.length !== 0 ? (
        <Form>
          <Form.Label style={{ textAlign: "left" }}>
            <b>Add Video to a playlist</b>
          </Form.Label>
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
        <ol>
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
                        }}
                      >
                        <li key={playlistIndex} style={{ cursor: "pointer" }} onClick={() => playPlaylist(playlistIndex)}>
                          <Link to={`/player/${playlist.video_list.length > 0 ? playlist.video_list[0]._id : ""}`}>
                            {playlist.name}
                          </Link>
                        </li>
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          onClick={(e) => {
                            window.confirm(
                              `Do you really want to delete ${playlist.name}?`
                            ) &&
                              deletePlaylist(playlist._id);
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
                                    }}
                                  >
                                    <li key={listVideoIndex} onClick={() => playSingleVideo(listVideo._id)}>
                                      <Link to={`/player/${listVideo._id}`}>
                                        {listVideo.title}
                                      </Link>
                                    </li>
                                    <Button
                                      type="button"
                                      variant="outline-secondary"
                                      onClick={() => { removeVideo(playlist._id, listVideo._id); }}
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
                            type="submit"
                            variant="outline-secondary"
                            onClick={(e) => {
                              e.preventDefault()
                              if (selectedVideo.video_id === null)
                                return alert('Select Video')
                                addVideo(playlist._id);
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
        </ol>
      </div>
    </div>
  );
};

export default Playlists;

