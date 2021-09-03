import { Container, Row, Col, Card } from "react-bootstrap";
import team1a from "../images/team1a.JPG";
import team2a from "../images/team2a.jpg";
import team3a from "../images/team3a.jpg";
import { QueryContext } from "../context/QueryContext";
import { useEffect, useContext } from "react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";
import { FaXingSquare } from "react-icons/fa";

const About = () => {
  const { ft, lg } = useContext(QueryContext);
  const [filter, setFilter] = ft;
  const [lang, setLang] = lg;

  useEffect(() => {
    setFilter("");
    setLang("");
  }, []);

  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{ marginBottom: "30px", width: "70%", color: "white", fontSize: "20px" }}
              >
                <h1 style={{ fontFamily: "cursive" }}>Our mission</h1>
                <p>
                  is to create a magic portal for you to watch videos for
                  children from all around the web and create your own playlists
                  with as few clicks as possible.
                </p>
                <p>
                  Create and play your own playlists and relax. It's literally
                  kids' play.
                </p>
                <p>
                  You can watch all provided videos and create temporary
                  playlists without even signing up. But behold: as soon as you
                  log out, your portal will close. If you want Lullifey to
                  maintain your portal, sign up!
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{ fontFamily: "cursive", color: "white" }}>
              Meet our team
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Card
                bg="light"
                style={{
                  width: "17rem",
                  height: "fit-content",
                  margin: "10px",
                }}
              >
                <img variant="top" src={team1a} width="100%" height="90%" />
                <Card.Body>
                  <Card.Title>Utsavi Kathiriya</Card.Title>
                  <Card.Text>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h6>Full Stack Developer</h6>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h2>
                          <a
                            href="https://www.linkedin.com/in/utsaviben-kathiriya/"
                            target="_blank"
                            style={{ margin: "7px", color: "black" }}
                          >
                            <FaLinkedin />
                          </a>
                        </h2>
                        <h2>
                          <a
                            href="https://github.com/Utsavi009"
                            target="_blank"
                            style={{ margin: "7px", color: "black" }}
                          >
                            <AiOutlineGithub />
                          </a>
                        </h2>
                        <h2>
                          <a
                            href="https://www.xing.com/profile/Utsaviben_Kathiriya/cv"
                            target="_blank"
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
              <Card
                bg="light"
                style={{
                  width: "17rem",
                  height: "fit-content",
                  margin: "10px",
                }}
              >
                <img variant="top" src={team2a} width="100%" height="90%" />
                <Card.Body>
                  <Card.Title>Clemens Dinkel</Card.Title>
                  <Card.Text>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h6>Full Stack Developer</h6>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h2>
                          <a
                            href="https://www.linkedin.com/in/clemens-dinkel"
                            target="_blank"
                            style={{ margin: "7px", color: "black" }}
                          >
                            <FaLinkedin />
                          </a>
                        </h2>
                        <h2>
                          <a
                            href="https://github.com/ClemensDinkel"
                            target="_blank"
                            style={{ margin: "7px", color: "black" }}
                          >
                            <AiOutlineGithub />
                          </a>
                        </h2>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
                bg="light"
                style={{
                  width: "17rem",
                  height: "fit-content",
                  margin: "10px",
                }}
              >
                <img variant="top" src={team3a} width="100%" height="90%" />
                <Card.Body>
                  <Card.Title>Christopher Hopp</Card.Title>
                  <Card.Text>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h6>Background & Moon Design</h6>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h2>
                          <a
                            href="https://www.youtube.com/channel/UC13nxc7uLXD32T1tsXGNP9g"
                            target="_blank"
                            style={{ margin: "7px", color: "black" }}
                          >
                            <FaYoutube />
                          </a>
                        </h2>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
