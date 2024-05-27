import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import gplay from "../images/app_btn2.webp";
import ios from "../images/app_btn1.webp";
import download from "../images/download.svg";

function Download() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@nocodeapi/embed-instagram-feed@latest/embed-instagram-feed.js?module";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="download" className="download-section">
      <Container>
        <Row>
          <Col md={6}>
            <div className="section-text">
              <div className="section-text__title text-white">
                Ladda ner vår app nu!
              </div>
              <div className="section-text__body text-white">
                Gör din festplanering enklare med vår app. Finns tillgänglig på
                App Store och Google Play.
              </div>
              <a href="#download" className="download-btn__img">
                <img src={ios} alt="app store" />
              </a>
              <a href="#download" className="download-btn__img">
                <img src={gplay} alt="google play store" />
              </a>
            </div>
          </Col>
          <Col md={6}>
            <div className="section-image">
              <img src={download} alt="download" />
            </div>
          </Col>
        </Row>
        <Row className="social-media-row">
          <Col>
            <h3 className="text-white text-center">Följ oss på Instagram</h3>
            <embed-instagram-feed
              url="https://v1.nocodeapi.com/bettobox/instagram/WSTJqtdLKWXGdnso"
              className="instagram-feed"
            ></embed-instagram-feed>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Download;
