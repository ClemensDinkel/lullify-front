import { Form, FormControl, Button, Image } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import queryString from "query-string";
import "../App.css";
import axios from "axios";

const Playlists = ({ user }) => {
  //  To create a playlist

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

  const createPlaylist = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://tranquil-reaches-12289.herokuapp.com/playlists`,
        queryString.stringify(playlists),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .catch((err) => console.log(console.error()))
      .then((x) => {
        console.log(playlists);
      });
    alert(`Do you want to add ${playlists.name} to your playlist?`);
    setPlaylists({ name: "" });
  };

  /* const onSubmit = (e) => {
    e.preventDefault();

    const newPlaylist = {
      name: playlists.name
    };

    api.createPlaylist(user.id, queryString.stringify(newPlaylist)).then((res) => {
      alert('playlist created')
      history.push(`/`);
    });
  }; */

  // To display Playlists

  const [displayPlaylists, setDisplayPlaylists] = useState([]);

  console.log(displayPlaylists);

  useEffect(async () => {
    if (user && user.id) {
      await axios
        .get(
          `https://tranquil-reaches-12289.herokuapp.com/users/${user.id}/playlists`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((res) => setDisplayPlaylists(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  
    const deletePlaylist = async (playlistId) => {
      if (user && user.id) {
        await axios
          .delete(
            `https://tranquil-reaches-12289.herokuapp.com/users/${user.id}/playlists/${playlistId}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          )
          .then((res) => alert("deleted"))
          .catch((err) => console.log(err));
      }
    };
  

  return (
    <div className="playlists">
      <h1>Playlists</h1>
      <Form className="d-flex" onSubmit={createPlaylist}>
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
                      variant="outline-success"
                      onClick={() => deletePlaylist(playlist._id)}
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
