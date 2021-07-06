import { Container, Row, Col, Card } from "react-bootstrap";
import team1 from "../images/team1.png";
import team2 from "../images/team2.jpg"

const About = () => {
  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col>
            <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{marginBottom: "30px", width: "70%", color: "white"}}>
              <h1 style={{fontFamily: "cursive"}}>Our mission</h1>
              <p>
                Lullifey is for entertaining Children.
              </p>
            </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{fontFamily: "cursive", color: "white"}}>Meet our team</h1>
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
              <Card bg="light" style ={{width:"17rem", height: "fit-content", margin: "10px"}}>
                  <img variant="top" src={team1} width="100%" height="90%" />
                <Card.Body>
                  <Card.Title>Utsavi Kathiriya</Card.Title>
                  <Card.Text>FullStack Developer</Card.Text>
                </Card.Body>
              </Card>
              <Card bg="light" style ={{width:"17rem", height: "fit-content", margin: "10px"}} >
                  <img variant="top" src={team2} width="100%" height="90%" />
                <Card.Body>
                  <Card.Title>Clemens Dinkel</Card.Title>
                  <Card.Text>FullStack Developer</Card.Text>
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
