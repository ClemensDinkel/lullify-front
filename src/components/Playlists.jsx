import { Form, FormControl, Button, Image } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

const Playlists = ({ user }) => {
  //  To create a playlist

  console.log(user);

  const [playlists, setPlaylists] = useState({
    name: "",
    video_list: [],
    user_id: null,
  });

  console.log(playlists);

  useEffect(() => {
    if (user && user.id) {
      api.fetchSingleUser(user.id).then((res) => {
        console.log(res.data[0]);
        const data = res.data[0];
        setPlaylists({
          user_id: data._id,
        });
      });
    }
  }, [user]);

  let history = useHistory();

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

    api.createPlaylist(playlists).then((res) => {
      alert(`Do you want to add ${playlists.name} to your playlist?`);
      setPlaylists({ name: "" });
      history.push(`/`);
    });
  };

  // To display Playlists

  const [displayPlaylists, setDisplayPlaylists] = useState([]);

  console.log(displayPlaylists);

  useEffect(() => {
    if(user && user.id) {
      api.getPlaylist(user.id)
    .then(res=> {
      setDisplayPlaylists(res.data)
    })
    .catch(err => console.log(err))
    }
  },[])


  return (
    <div className="playlists">
      <h1>Playlists</h1>
      <Form className="d-flex" onSubmit={addPlaylist}>
        <FormControl
          type="text"
          placeholder="Create Playlist"
          className="mr-6"
          name="name"
          value={playlists.name}
          onChange={onChange}
          required
        />
        <Button type="submit" variant="outline-success">
          <AiOutlinePlus />
        </Button>
      </Form>
      <div>
        <ul>
          {displayPlaylists &&
            displayPlaylists.map((playlist, index) => {
              return (
                <>
                  <div style={{ display: "flex" }}>
                    <li key={index}>{playlist.name}</li>
                    <Button
                    type="submit"
                      variant="outline-success"
                      onClick= {(e) => {
                        e.preventDefault();
                          api.deletePlaylist(user.id, playlist._id)
                            .then(res => {
                              alert(`Do you want to delete ${playlist.name}?`);
                              history.push(`/`);
                          })
                        
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </>
              );
            })}
        </ul>
      </div> 
    </div>
  );
};

export default Playlists;
