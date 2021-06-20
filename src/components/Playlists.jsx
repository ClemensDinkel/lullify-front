import { Form, FormControl, Button, Image } from 'react-bootstrap'
import api from "../api";
import { AiOutlinePlus } from 'react-icons/ai'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import queryString from "query-string";
import '../App.css'

const Playlists = ({ user }) => {

  //  To create a playlist

  const [playlists, setPlaylists] = useState({
    name: "",
    video_list: [],
    user_id: ""
  })

  console.log(playlists)

  useEffect(() => {
    if (user && user.id) {
      api.fetchSingleUser(user.id)
        .then(res => {
          console.log(res.data[0])
          const data = res.data[0];
          setPlaylists({
            user_id: data._id
          })
        })
    }
  }, [user])


  let history = useHistory()

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setPlaylists((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newPlaylist = {
      name: playlists.name,
      user_id: user.id
    };

    api.createPlaylist(queryString.stringify(newPlaylist)).then((res) => {
      alert('playlist created')
      history.push(`/`);
    });
  };

  // To show Playlists

  const [showPlaylists, setShowPlaylists] = useState([])

  useEffect(() => {
    if (user && user.id) {
      api.getPlaylist(user.id)
        .then(res => { console.log(res.data) })
    }

  }, [])



  return (
    <div className="playlists">
      <h1>Playlists</h1>
      <Form className="d-flex" onSubmit={onSubmit}>
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
    </div>
  )
}

export default Playlists;
