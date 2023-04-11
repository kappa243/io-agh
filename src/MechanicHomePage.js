import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const MechanicHomePage = () => (
  <>
    <Navbar>
      <Container>
        <Button>Dodaj zamówienie</Button>
        <Navbar.Brand>IO IO IO</Navbar.Brand>
        <Button>Wyloguj</Button>
      </Container>
    </Navbar>
    <Container>
      <h1>MECHANIC HOME PAGE</h1>
    </Container>
  </>
);

export default MechanicHomePage;
