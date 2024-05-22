import React from "react";
import { Container, Row } from "react-bootstrap";
import heroImage from "../../../images/hero-right.png";

function HeroBanner() {
  return (
    <section id="home">
      <Container>
        <Row>
          <div className="home-text">
            <div className="section-text__subtitle">The party never stops</div>
            <div className="section-text__title-big">
              Let's get the party started
            </div>
            <div className="section-text__body">
              Dorem ipsum dolor sitamet, consectetur adipiscing elit, sed do
              eiusm tempor incididunt ulabore et dolore magna aliqua.
            </div>
            <a href="#download" className="download-btn">
              Shop now
            </a>
          </div>

          <div className="section-image">
            <img src={heroImage} alt="App Preview" />
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default HeroBanner;
