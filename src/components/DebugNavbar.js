'use client';

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useUserEmail } from "@/logic/auth";

const DebugNavbar = () => {
  const email = useUserEmail();

  return (
    <Navbar bg="warning">
      <Container>
        <Navbar.Brand>IO IO IO</Navbar.Brand>
        <Navbar.Text>Debug only navbar</Navbar.Text>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/mechanic/home">Mechanic Home</Nav.Link>
            <Nav.Link href="/client/order">Client Order</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>{email}</Navbar.Text>
        <Navbar.Text className="ms-4">YES WE CAN</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default DebugNavbar;
