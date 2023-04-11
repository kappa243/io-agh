import React from "react";
import { useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import OrderListItem from "./OrderListItem";
import OrderDetails from "./OrderDetails";
import AddOrder from "./AddOrder";
import useOrderList from "./logic/useOrderList";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "./logic/fb";

const MechanicHomePage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addOrderVisible, setAddOrderVisible] = useState(false);

  const handleSelectOrder = useCallback((order) => {
    setSelectedOrder(order);
    setAddOrderVisible(false);
  }, []);

  const handleAddOrder = useCallback(() => {
    setSelectedOrder(null);
    setAddOrderVisible(true);
  }, []);

  const [signOut, ,] = useSignOut(auth);

  const orders = useOrderList();
  console.log(orders);

  return (
    <>
      <Navbar bg="primary">
        <Container>
          <Button onClick={handleAddOrder}>Dodaj zamówienie</Button>
          <Navbar.Brand className="text-white fw-bolder fs-3">IO IO IO</Navbar.Brand>
          <Button onClick={signOut}>Wyloguj</Button>
        </Container>
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
          <Col xs="7">
            {orders.map((order) => (
              <OrderListItem
                key={order.id}
                order={order}
                onClick={() => handleSelectOrder(order)}
              />
            ))}
          </Col>
          <Col>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
            {addOrderVisible && <AddOrder />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MechanicHomePage;
