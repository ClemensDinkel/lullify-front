import { Container, Row, Col } from "react-bootstrap";
import { QueryContext } from "../../context/QueryContext";
import { useEffect, useContext } from "react";
import { Mission } from "./Mission";
import { Team } from "./Team";

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
            <Mission />
          </Col>
        </Row>
        <Row>
          <Col>
            <Team />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
