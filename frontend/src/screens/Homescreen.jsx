import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import { fetchJSONData } from "./../network";

const Homescreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchJSONData("http://localhost:8080/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={3}>
            <ProductScreen product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homescreen;
