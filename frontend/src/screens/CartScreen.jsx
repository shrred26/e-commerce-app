import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/shared/Message";
import { Link } from "react-router-dom";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? location.search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    history.push("/login/redirect=shipping");
  };

  return (
    <Row>
      <Col md={0}>
        <h1>shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty
            <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, item) => acc + Number(item.qty) * Number(item.price),
                  0
                )
                .toFixed(2)}
            </ListGroupItem>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length == 0}
              onClick={() => checkout()}
            >
              Proceed to checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
