import { useState, useEffect, useContext } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";


const LocalPlaylists = () => {
  const [videos] = useContext(VideoContext);
  const [localPlaylists, setLocalPlaylists] = useState([])
  const[name, setName] = useState("")
  const[title, setTitle] = useState("")

  console.log(localPlaylists)


  const handleSubmitPlaylist = (e) => {
    e.preventDefault()
    let localPlaylist={name}
    setLocalPlaylists([...localPlaylists, localPlaylist])
    setName("")
  }


  return(
    <div>
      <h2>LocalPlyalist</h2>
      <div>
      <Form className="d-flex" onSubmit={handleSubmitPlaylist}>
        <FormControl
          type="text"
          placeholder="Create Playlist"
          className="mr-6"
          name="name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
        />
        <Button type="submit" variant="outline-secondary">
          <AiOutlinePlus />
        </Button>
      </Form>

      </div>
    </div>
  )
}

export default LocalPlaylists