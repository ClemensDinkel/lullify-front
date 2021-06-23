import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../api";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { Form, FormControl, Button, Image, Alert } from "react-bootstrap";
import {Link} from "react-router-dom"

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
    <div>
      <p>Content List</p>
      <div>
        <ul>
          {uploaderVideos &&
            uploaderVideos.map((uploaderVideo, index) => {
              return (
                <li key={index}>
                  <div style={{ display: "flex" }}>
                    <p>{uploaderVideo.title}</p>
                    <Link exact to={`/video/${uploaderVideo._id}`}>
                    <Button type="submit" variant="outline-success">
                      <AiTwotoneEdit />
                    </Button>
                    </Link>
                    <Button type="submit" variant="outline-success"
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
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ContentList;
