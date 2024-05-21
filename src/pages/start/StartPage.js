import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../productlist/ProductList";

function StartPage() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/latest"
        );
        setLatestProducts(response.data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="start-page">
      <h1>Startsida</h1>
      <ProductList products={latestProducts} />
    </div>
  );
}

export default StartPage;
