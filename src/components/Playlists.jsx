import { Form, FormControl, Button, Image, Nav } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete, MdPlaylistAdd } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import "../App.css";
import { UserContext } from "../context/UserContext";
import { PlaylistContext } from "../context/PlaylistContext";
import { Link } from "react-router-dom";
import moon_image from "../images/moon2.png"

const Playlists = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const [loading, setLoading] = useState(true);
  const { ppl, perl, sl } = useContext(PlaylistContext);
  const [playedList, setPlayedList] = ppl;
  const [selectedListIndex, setSelectedListIndex] = sl
  const [permanentPlaylists, setPermanentPlaylists] = perl;
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    user_id: null,
  });

  // get playlists on first mount
  useEffect(() => {
    if (decToken && decToken.id) loadPlaylists();
  }, []);

  // called on first mount
  const loadPlaylists = () => {
    api
      .getPlaylist(decToken.id)
      .then((res) => {
        setPermanentPlaylists(res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  // keeps track of a newPlaylist's name and user_id
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
        setPermanentPlaylists(prev => [...prev, res.data])
        setNewPlaylist({})
      })
      .catch(err => console.log(err))
  }

  const deletePlaylist = (playlist_id, playlistIndex) => {
    if (selectedListIndex === playlistIndex) setSelectedListIndex(0)
    let playlistsBackup = [...permanentPlaylists] 
    let newPP = [...permanentPlaylists]
    newPP.splice(playlistIndex, 1)
    setPermanentPlaylists(newPP)
    api
      .deletePlaylist(decToken.id, playlist_id)
      .catch(() => setPermanentPlaylists(playlistsBackup))
  }

  // <<Playlist -- Videos>>

  const removeVideo = (playlist_id, playlistIndex, video_id, videoIndex) => {
    let playlistsBackup = [...permanentPlaylists]
    let newPP = [...permanentPlaylists]
    console.log(newPP[playlistIndex])
    newPP[playlistIndex].video_list.splice(videoIndex, 1)
    setPermanentPlaylists(newPP)
    api.removeVideoFromPlaylist(decToken.id, playlist_id, { video_id: video_id })
      .catch(err => {
        console.log(err)
        setPermanentPlaylists(playlistsBackup)
      })
  }

  // run the player with the selected playlist
  const playPlaylist = (index) => {
    const autoPlay = permanentPlaylists[index].video_list
    let finalAutoPlay = []
    autoPlay.forEach(playlist => finalAutoPlay.push(playlist._id))
    setPlayedList(finalAutoPlay)
  }

  const playSingleVideo = (id) => setPlayedList([id]);

  // select to add from previews if there is more than 1 playlist
  const selectPlaylist = (playlistIndex) => setSelectedListIndex(playlistIndex)

  return (
    <div className="playlists-container">
      <div className="playlists">
        <h2 style={{ fontSize: "30px", fontFamily: "serif", color: "yellow" }}><b>Playlists</b></h2>
        <Form style={{ display: "flex", marginBottom: "10px" }} onSubmit={addPlaylist}>
          <FormControl
            type="text"
            placeholder="Create Playlist"
            className="mr-6"
            name="name"
            value={newPlaylist.name || ""}
            onChange={onChangeNewPlaylist}
            required
          />
          <Button type="submit" variant="dark">
            <AiOutlinePlus />
          </Button>
        </Form>
        <div>
          <ul style={{ listStyle: "none" }}>
            {permanentPlaylists &&
              permanentPlaylists.map((playlist, playlistIndex) => {
                return (
                  <>
                    {!loading ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                          }}
                        >
                          <li
                            key={playlistIndex}
                            style={{ cursor: "pointer", color: "antiquewhite", width: "80%", textAlign: "left" }}
                            onClick={() => playPlaylist(playlistIndex)}
                          >
                            <Nav.Link as={Link} to={
                              playlist.video_list.length > 0
                                ? `/player/${playlist.video_list[0]._id}`
                                : "#"
                            }
                            >
                              <h5
                                style={{
                                  color: "antiquewhite",
                                  fontFamily: "cursive",
                                  textDecoration: "underline"
                                }}
                              >
                                {playlist.name}
                              </h5>
                            </Nav.Link>
                          </li>
                          <div style={{ display: "flex" }}>
                            {permanentPlaylists.length > 1 &&
                              <Button
                                type="button"
                                variant= {selectedListIndex === playlistIndex ? "success" : "dark"}
                                onClick={() => selectPlaylist(playlistIndex)}
                                style={{ maxHeight: "40px", marginLeft: "5px" }}
                              >
                                <MdPlaylistAdd />
                              </Button>
                            }
                            <Button
                              type="button"
                              style={{ maxHeight: "40px", marginLeft: "5px" }}
                              variant="dark"
                              onClick={(e) => {
                                window.confirm(
                                  `Do you really want to delete ${playlist.name}?`
                                ) && deletePlaylist(playlist._id, playlistIndex);
                              }}
                            >
                              <MdDelete />
                            </Button>
                          </div>
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
                                        width: "100%"
                                      }}
                                    >
                                      <li
                                        key={listVideoIndex}
                                        style={{
                                          color: "antiquewhite",
                                          display: "flex",
                                          flexWrap: "wrap",
                                          width: "80%",
                                          textAlign: "left"
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
                                        style={{ maxHeight: "40px" }}
                                        variant="dark"
                                        onClick={() => { removeVideo(playlist._id, playlistIndex, listVideo._id, listVideoIndex); }}
                                      >
                                        <MdDelete />
                                      </Button>
                                    </div>
                                  );
                                }
                              )}
                          </ul>
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
