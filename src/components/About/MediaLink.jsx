import { AiOutlineGithub } from "react-icons/ai"
import { FaLinkedin, FaXingSquare, FaYoutube } from "react-icons/fa"

export const MediaLink = ({ medium }) => (
  <h2>
    <a
      href={medium[1]}
      target="_blank"
      rel="noreferrer"
      style={{ margin: "7px", color: "black" }}
    >
      {
        medium[0] === "linkedIn" ?
          <FaLinkedin /> :
          medium[0] === "gitHub" ?
            <AiOutlineGithub /> :
            medium[0] === "xing" ?
              <FaXingSquare /> :
              medium[0] === "youTube" ?
                <FaYoutube /> :
                <p>{medium[0]}</p>
      }
    </a>
  </h2>
)
