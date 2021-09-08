import { Card } from "react-bootstrap"
import { FaLinkedin } from "react-icons/fa"
import { AiOutlineGithub } from "react-icons/ai"
import { FaXingSquare } from "react-icons/fa"
import { MediaLink } from "./MediaLink"

export const Member = ({ member, image }) => {
  const { name, job, socialMedia } = member
  const { linkedIn, gitHub, xing, youTube } = socialMedia ?? undefined

  const socialMediaArray = Object.entries(socialMedia)
  console.log(socialMediaArray)
  return (
    <Card
      bg="light"
      style={{
        width: "17rem",
        height: "fit-content",
        margin: "10px",
      }}
    >
      <img variant="top" alt={name} src={image} width="100%" height="90%" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center",}}>
            <h6>{job}</h6>
            <div style={{display: "flex",justifyContent: "center"}}>
              {socialMediaArray.map(medium => <MediaLink medium={medium}/>)}
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}