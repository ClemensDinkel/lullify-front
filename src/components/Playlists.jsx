import { Form, FormControl, Button, Image, Alert } from "react-bootstrap";
import api from "../api";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../App.css";
import { UserContext } from '../context/UserContext'

const Playlists = () => {
  //  To create a playlist
  const { dTk, sUI } = useContext(UserContext)
  const [decToken] = dTk
  const [singleUserInfo] = sUI
  let history = useHistory();

  const [loading, setLoading] = useState(true);

  const [playlists, setPlaylists] = useState({
    name: "",
    video_list: [],
    user_id: null,
  });

  useEffect(() => {
    if (decToken && decToken.id) setPlaylists({user_id: singleUserInfo._id})
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
    //e.preventDefault();

    api.createPlaylist(playlists).then((res) => {
      alert(`Do you want to add ${playlists.name} to your playlist?`);
      setPlaylists({ name: "" });
      history.push(`/`);
    });
  };

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
  }, [playlists]);

  return (
    <div className="playlists">
      <h2>Playlists</h2>
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
                  {!loading ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <li key={index}>{playlist.name}</li>
                        <Button
                          type="submit"
                          variant="outline-success"
                          onClick={(e) => {
                            e.preventDefault();
                            api
                              .deletePlaylist(decToken.id, playlist._id)
                              .then((res) => {
                                alert(
                                  `Do you want to delete ${playlist.name}?`
                                );
                                window.location.reload()
                                history.push(`/`);
                              });
                          }}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                      <div>
                        <ul>
                          <Form className="d-flex" onSubmit={addPlaylist}>
                            <FormControl
                              type="text"
                              placeholder="Add Videos"
                              className="mr-5"
                              name="video_list"
                              value={playlists.video_list}
                              onChange={onChange}
                              required
                            />
                            <Button type="submit" variant="outline-success">
                              <AiOutlinePlus />
                            </Button>
                          </Form>
                          <li>123</li>
                          <li>123</li>
                          <li>123</li>
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
  );
};

export default Playlists;
