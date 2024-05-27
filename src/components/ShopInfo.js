import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

function ShopInfo() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="shop-info" className="shop-info-section">
      <Container>
        <Row>
          <Col>
            <div className="shop-info-box">
              <h2 className="shop-info-title">
                SHOPPA PARTYARTIKLAR PÅ PARTYPULSE.SE
              </h2>
              <p className="shop-info-text">
                Partypulse.se är din ledande e-handlare för partyartiklar och
                festdekorationer. Vi har ett stort utbud av allt du behöver för
                att göra din fest oförglömlig. Hos oss hittar du allt från
                ballonger och konfetti till festliga dekorationer och temapaket.
              </p>
              <p className="shop-info-text">
                Vi på Partypulse.se älskar allt som har med fest att göra,
                därför ser vi alltid till att vara uppdaterade med de senaste
                festtrenderna. Vi vill inspirera dig med nyheter varje dag, så
                att du enkelt ska hitta produkter som passar din fest perfekt.
                Här hittar du allt från trendiga dekorationer, ballonger,
                konfettikanoner, fotobås-kit, och mycket mer – alltid till bra
                pris och med snabb leverans!
              </p>
            </div>
          </Col>
        </Row>

        <Row className="shop-info-benefits">
          <Col className="benefit-item" md={4}>
            <ion-icon
              name="newspaper-outline"
              className="benefit-icon"
              size="large"
            ></ion-icon>
            <p className="benefit-text">Nyheter varje vecka</p>
          </Col>
          <Col className="benefit-item" md={3}>
            <ion-icon
              name="flash-outline"
              className="benefit-icon"
              size="large"
              style={{ color: "#ffea00" }}
            ></ion-icon>
            <p className="benefit-text">Snabbleverans 1-2 arbetsdagar</p>
          </Col>
          <Col className="benefit-item" md={3}>
            <ion-icon
              name="cube-outline"
              className="benefit-icon"
              size="large"
              style={{ color: "#6982ff" }}
            ></ion-icon>
            <p className="benefit-text">Fri frakt över 499 kr</p>
          </Col>
          <Col className="benefit-item" md={3}>
            <ion-icon
              name="refresh-outline"
              className="benefit-icon"
              size="large"
            ></ion-icon>
            <p className="benefit-text">Fri retur vid ny order</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ShopInfo;
