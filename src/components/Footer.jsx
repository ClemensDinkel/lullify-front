import React from "react";
import "../App.css";
import { FaArrowUp } from "react-icons/fa";
import { Container, Button } from "react-bootstrap";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <Container fluid="true">
      <div className="footer">
        <div>
          <span>Copyright © {year} All Rights Reserved</span>
        </div>
        <div>
          <Button
            variant="outline-light"
            type="button"
            onClick={() => window.scrollTo(0, 0)}
          >
            <FaArrowUp />
          </Button>
        </div>
      </div>
    </Container>
  );
};
export default Footer;
