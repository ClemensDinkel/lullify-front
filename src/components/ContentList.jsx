import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../api";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { Form, FormControl, Button, Image, Alert } from "react-bootstrap";
import {Link} from "react-router-dom"
import { green } from "@material-ui/core/colors";

const ContentList = () => {

  let history = useHistory();

  const { dTk } = useContext(UserContext);
  const [decToken, setDecToken] = dTk;
  const [uploaderVideos, setUploaderVideos] = useState([]);

  console.log(uploaderVideos);

  useEffect(() => {
    if (decToken && decToken.id) {
      api
        .getUploaderAllVideos(decToken.id)
        .then((res) => {
          setUploaderVideos(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [decToken]);

  return (
    <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
      <h3>Content List</h3>
      <div style={{margin: ".4rem"}} >
        
          {uploaderVideos &&
            uploaderVideos.map((uploaderVideo, index) => {
              return (
                <Alert key={index} variant="secondary">
                  <div style={{ display: "flex", textAlign: "left"}}>
                    <div style={{width: "80%"}}>
                    <p>{uploaderVideo.title}</p>
                    </div>
                    <div style={{width: "20%"}}>
                    <Link exact to={`/video/${uploaderVideo._id}`}>
                    <Button type="submit" variant="outline-secondary">
                      <AiTwotoneEdit />
                    </Button>
                    </Link>
                    <Button type="submit" variant="outline-secondary"
                      onClick={(e) => {
                        api.deleteUploaderVideo(decToken.id, uploaderVideo._id)
                        .then((res) => {
                          alert(
                            `Do you want to delete ${uploaderVideo.title}?`
                          );
                          window.location.reload();
                          history.push(`/creator`);
                        });
                      }}
                    >
                      <MdDelete />
                    </Button>
                    </div>
                  </div>
                </Alert>
              );
            })}
        
      </div>
    </div>
  );
};

export default ContentList;
