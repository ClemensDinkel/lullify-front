import { Container, Row, Col, Card } from "react-bootstrap";

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
                Lullify is for entertaining Children.
              </p>
            </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{fontFamily: "cursive", color: "white"}}>Meet our team</h1>
            <div style={{display: "flex", justifyContent: "center"}}>
              <Card bg="light" style ={{width:"17rem", height: "27rem", margin: "5px"}}>
                  <img variant="top" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" width="100%" height="90%" />
                <Card.Body>
                  <Card.Title>Utsavi Kathiriya</Card.Title>
                  <Card.Text>FullStack Developer</Card.Text>
                </Card.Body>
              </Card>
              <Card bg="light" style ={{width:"17rem", height: "27rem", margin: "5px"}} >
                  <img variant="top" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" width="100%" height="90%" />
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
