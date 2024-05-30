import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import balloons from "../images/party-balloons.png";

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
            <div className="section-image">
              <img src={balloons} alt="balloons" />
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
