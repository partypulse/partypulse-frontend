import React from "react";
import { Container, Row } from "react-bootstrap";
import heroImage from "../images/balloons_banner.png";
import { Link } from "react-router-dom";

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

            <Link to="/products" className="download-btn">
              Utforska vårt sortiment
            </Link>

            <div className="section-text__body">
              Här hittar du allt du behöver för att göra ditt nästa party till
              en succé. Vi hjälper dig att skapa minnesvärda ögonblick för alla
              tillfällen!
            </div>
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
