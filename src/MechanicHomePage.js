import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import OrderListItem from "./OrderListItem";

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
      <Row>
        <Col xs="7">
          <OrderListItem />
          <OrderListItem />
          <OrderListItem />
        </Col>
        <Col>
          <p>Tu pojawi się info</p>
        </Col>
      </Row>
    </Container>
  </>
);

export default MechanicHomePage;
