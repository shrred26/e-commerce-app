import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "./../components/shared/loader";
import Message from "../components/shared/Message";

const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                {product.countInStock > 0 ? (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Row>
                  </ListGroupItem>
                ) : null}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block w-100"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
