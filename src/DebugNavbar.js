import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useUserEmail } from "./logic/auth";

const DebugNavbar = () => {
  const email = useUserEmail();

  return (
    <Navbar bg="warning">
      <Container>
        <Navbar.Brand>IO IO IO</Navbar.Brand>
        <Navbar.Text>Debug only navbar</Navbar.Text>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/mechanic/home">
              <Nav.Link>Mechanic Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/client/order">
              <Nav.Link>Client Order</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>{email}</Navbar.Text>
        <Navbar.Text className="ms-4">YES WE CAN</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default DebugNavbar;
