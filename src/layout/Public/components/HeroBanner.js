import React from "react";
import { Container, Row } from "react-bootstrap";
import heroImage from "../../../images/balloons_banner.png";

function HeroBanner() {
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row className="hero-row">
          <div className="home-text">
            <div className="section-text__subtitle">The party never stops</div>
            <div className="section-text__title-big">
              Let's get the party started
            </div>
            <div className="section-text__body">
              Här hittar du allt du behöver för att göra ditt nästa party till
              en succé. Vi hjälper dig att skapa minnesvärda ögonblick för alla
              tillfällen!
            </div>
            <a href="#download" className="download-btn">
              Utforska vårt sortiment
            </a>
          </div>

          <div className="section-image">
            <img src={heroImage} alt="App Preview" className="hero-image" />
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default HeroBanner;
