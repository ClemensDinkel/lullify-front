import { Card } from "react-bootstrap"
import { FaLinkedin } from "react-icons/fa"
import { AiOutlineGithub } from "react-icons/ai"
import { FaXingSquare } from "react-icons/fa"

export const Member = ({ member }) => {
  const {name, job, image, socialMedia} = member
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h6>{job}</h6>
            <div
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h2>
                <a
                  href="https://www.linkedin.com/in/utsaviben-kathiriya/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ margin: "7px", color: "black" }}
                >
                  <FaLinkedin />
                </a>
              </h2>
              <h2>
                <a
                  href="https://github.com/Utsavi009"
                  target="_blank"
                  rel="noreferrer"
                  style={{ margin: "7px", color: "black" }}
                >
                  <AiOutlineGithub />
                </a>
              </h2>
              <h2>
                <a
                  href="https://www.xing.com/profile/Utsaviben_Kathiriya/cv"
                  target="_blank"
                  rel="noreferrer"
                  style={{ margin: "7px", color: "black" }}
                >
                  <FaXingSquare />
                </a>
              </h2>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}