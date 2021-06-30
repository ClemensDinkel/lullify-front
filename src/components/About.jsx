import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col>
            <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{marginBottom: "30px", width: "70%"}}>
              <h1>Our work</h1>
              <p>
                Your child can join Tintin as he travels the world, solves
                mysteries and nabs crooks; your child can study at Hogwarts and
                learn about life through the magical world of Harry Potter; your
                child can go back in time and become an active participant at
                Akbar’s court.
              </p>
            </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Meet our team</h1>
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



/* 
<div>
<img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" width="65%" height="80%"/>
<h4>Utsavi Kathiriya</h4>
<p>Fullstack Developer</p>
</div>
<div>
<img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" width="65%" height="80%"/>
<h4>Clemens Dinkel</h4>
<p>Fullstack Developer</p>
</div> */