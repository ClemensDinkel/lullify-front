import { AiOutlineGithub } from "react-icons/ai"
import { FaLinkedin, FaXingSquare, FaYoutubeSquare } from "react-icons/fa"

export const MediaLink = ({ medium }) => {
  console.log(medium[1])
  return (
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
                  <FaYoutubeSquare /> :
                  <p>{medium[0]}</p>
        }
      </a>
    </h2>
  )
}