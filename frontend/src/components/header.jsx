import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const header = () => {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">Online Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">
                <i className="fas fa-shopping-cart"></i>
                &nbsp; Cart
              </Nav.Link>
              <Nav.Link href="#link">
                <i className="fas fa-user"></i>
                &nbsp; Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default header;
