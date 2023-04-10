import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const AppNavbar = () => (
  <Navbar variant={"dark"} bg={"primary"}>
    <Container>
      <Navbar.Brand>IO IO IO</Navbar.Brand>
      <Navbar.Text>YES WE CAN</Navbar.Text>
    </Container>
  </Navbar>
);

export default AppNavbar;
