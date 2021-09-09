import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const VideoOptions = ({ uploaderVideo, handleDelete }) => (
  <tr>
    <td style={{ textAlign: "left" }}>{uploaderVideo.title}</td>
    <td>
      <Link to={`/video/${uploaderVideo._id}`}>
        <Button type="submit" variant="light">
          <AiTwotoneEdit />
        </Button>
      </Link>
    </td>
    <td>
      <Button
        type="submit"
        variant="light"
        onClick={() => handleDelete(uploaderVideo)}
      >
        <MdDelete />
      </Button>
    </td>
  </tr>
)

export default VideoOptions