import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetch(
        `http://localhost:8080/api/product/${match.params.id}`
      ).then((resp) => resp.json());
      setProduct(data);
    };
    fetchProduct();
  }, []);
  return (
    <div>
      <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left"></i>
        &nbsp;Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image className="w-100" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} text={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col>Status :</Col>
              <Col>
                {product.countInStock > 0 ? "In stock" : "out of stock"}
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Button className="btn-block w-100" type="button">
              Add to cart
            </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
