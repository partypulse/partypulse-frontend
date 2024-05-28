import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import "../css/BalloonProducts.css";

const BalloonProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/category/products/category/6654e37f31759d480f00ba78") // Använd kategorins ObjectId
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <section id="balloon-products" className="balloon-products-section">
      <Container>
        <h2 className="section-title">Ballonger</h2>
        <Row>
          {products.map((product) => (
            <Col md={4} key={product._id}>
              <Card className="product-card">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.info}</Card.Text>
                  <Card.Text>Pris: {product.price} SEK</Card.Text>
                  <Button variant="primary">Lägg till i varukorgen</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BalloonProducts;
