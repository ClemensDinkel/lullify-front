import { Form, FormControl, Button, Image, Alert } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
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

  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [autoPlaylist, setAutoPlaylist] = useContext(PlaylistContext)

  const [playlists, setPlaylists] = useState({
    name: "",
    user_id: null,
  });

  const [videoList, setVideoList] = useState({ video_id: null });

  const onChangeVideoList = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setVideoList((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  useEffect(() => {
    if (decToken && decToken.id) {
      setPlaylists((prev) => {
        return { ...prev, user_id: decToken.id };
      });
    }
  }, [decToken]);

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setPlaylists((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const addPlaylist = (e) => {
    e.preventDefault();

    window.confirm(`Do you want to add ${playlists.name} to your playlist?`) &&
    api.createPlaylist(playlists).then((res) => {
      setPlaylists({ name: "" });
      history.push(`/`);
    });
  };

  const playPlaylist = (index) => {
    const autoPlay = displayPlaylists[index].video_list
    let finalAutoPlay = []
    autoPlay.forEach(videolist => finalAutoPlay.push(videolist._id))
    console.log(finalAutoPlay)
    setAutoPlaylist(finalAutoPlay)
  }
   
  // To display Playlists

  const [displayPlaylists, setDisplayPlaylists] = useState([]);

  useEffect(() => {
    if (decToken && decToken.id) {
      api
        .getPlaylist(decToken.id)
        .then((res) => {
          setDisplayPlaylists(res.data);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    }
  }, [playlists, decToken]);

  useEffect(() => {
    console.log(displayPlaylists)
  },[displayPlaylists])

  return (
    <div className="playlists">
      <h2 className="create-playlist">Create Playlist</h2>
      <Form className="d-flex" onSubmit={addPlaylist}>
      <Form.Group controlId="formBasicEmail">
        <FormControl
          type="text"
          placeholder="Create Playlist"
          className="mr-6"
          name="name"
          value={playlists.name}
          onChange={onChange}
          required
        />
        </Form.Group>
        <Button type="submit" variant="outline-secondary">
          <AiOutlinePlus />
        </Button>
      </Form>
      <h4> </h4>
      {displayPlaylists.length !== 0 ? (
        <Form>
        <Form.Label>
          <h6 style={{fontFamily: "cursive"}}>Add Video</h6>
        </Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
          name="video_id"
          value={videoList.video_id}
          onChange={onChangeVideoList}
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
          {displayPlaylists &&
            displayPlaylists.map((playlist, playlistIndex) => {
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
                            <h5 style={{color: "white"}}>{playlist.name}</h5>
                          </Link>
                        </li>
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          onClick={(e) => {
                            e.preventDefault()
                            window.confirm(
                              `Do you want to delete ${playlist.name}?`
                            ) &&
                            api
                              .deletePlaylist(decToken.id, playlist._id)
                              .then((res) => {
                                window.location.reload(); 
                                history.push(`/`);
                              });
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
                                    <li key={listVideoIndex}>
                                      <Link to={`/player/${listVideo._id}`}>
                                        <p style={{color: "white"}}>{listVideo.title} </p>
                                      </Link>
                                    </li>
                                    <Button
                                      type="submit"
                                      variant="outline-secondary"
                                      onClick={() => {
                                        window.confirm(`Do you want to delete?`) &&
                                        api
                                          .removeVideoFromPlaylist(
                                            decToken.id,
                                            playlist._id,
                                            { video_id: listVideo._id }
                                          )
                                          .then((res) => {
                                            window.location.reload();
                                            history.push(`/`);
                                          });
                                      }}
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
                              if(videoList.video_id === null)
                                return alert('Select Video')
                              window.confirm("Want to add Video?") &&
                                api
                                  .addVideoToPlaylist(
                                    decToken.id,
                                    playlist._id,
                                    videoList
                                  )
                                  .then((res) => {
                                    history.push("/");
                                  })
                                  .catch((err) => alert("video already exist"))
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

