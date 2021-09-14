import { Form, FormControl, Button, Image, Nav, Spinner } from "react-bootstrap";
import api from "../../api";
import "../../App.css";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete, MdPlaylistAdd } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { PlaylistContext } from "../../context/PlaylistContext";
import { Link } from "react-router-dom";
import moon_image from "../../images/moon2.png"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PermanentLists from "./PermanentLists";
import LoadingSpinner from "../LoadingSpinner";

const PermanentPlaylistsSection = () => {
  const { dTk } = useContext(UserContext);
  const [decToken] = dTk;
  const { ppl, perl, sl } = useContext(PlaylistContext);
  const [playedList, setPlayedList] = ppl;
  const [selectedListIndex, setSelectedListIndex] = sl;
  const [permanentPlaylists, setPermanentPlaylists] = perl;
  const [playlistsLoaded, setPlaylistsLoaded] = useState(false)
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
        setPlaylistsLoaded(true)
        setPermanentPlaylists(res.data);
      })
      .catch((err) => console.log(err));
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

  // dnd operations

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = result => {
    const target = result.destination
    const origin = result.source
    if (!target) return;
    if (target.index === origin.index) return;
    const plIndex = parseInt(target.droppableId)
    const newPP = [...permanentPlaylists]
    const BackupPP = [...permanentPlaylists]
    const videosNew = reorder(
      newPP[plIndex].video_list,
      origin.index,
      target.index
    );
    newPP[plIndex].video_list = videosNew
    setPermanentPlaylists(newPP)
    api.updatePlaylist(decToken.id, newPP[plIndex]._id, newPP[plIndex])
      .catch(err => {
        console.log(err)
        setPermanentPlaylists(BackupPP)
      })
  }

  return (
    <div className="playlists-container">
      <div className="playlists">
        <h2 style={{ fontSize: "30px", fontFamily: "cursive", color: "yellow" }}><b>Playlists</b></h2>
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
        {playlistsLoaded ?
          <PermanentLists
            permanentPlaylists={permanentPlaylists}
            playPlaylist={playPlaylist}
            selectedListIndex={selectedListIndex}
            selectPlaylist={selectPlaylist}
            deletePlaylist={deletePlaylist}
            onDragEnd={onDragEnd}
            playSingleVideo={playSingleVideo}
            removeVideo={removeVideo}
          /> :
          <LoadingSpinner />
        }
      </div>

      <div className="moon-image">
        <Image src={moon_image} alt="moon" width="50%" style={{ maxWidth: "200px" }}></Image>
      </div>
    </div>
  );
};

export default PermanentPlaylistsSection;
