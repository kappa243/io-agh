import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const OrderDetails = () => {
  const order = {
    carName: "Fiat 126p",
    year: 1980,
    customerName: "Jan Kowalski",
    cost: 1000,
    profit: 500,
    status: "AWAITING_PARTS",
    dueDate: "2020-12-12",
    description: "Jakiś zbyt długi opis ląduje tutaj jakiś zbyt długi opis ląduje tutaj jakiś zbyt długi opis ląduje tutaj jakiś zbyt długi opis ląduje tutaj jakiś zbyt długi opis ląduje tutaj jakiś zbyt długi opis ląduje tutaj.",
  };

  const orderStatusText = {
    AWAITING_PARTS: "Oczekuje na części",
    IN_PROGRESS: "W trakcie naprawy",
    DONE: "Zakończone",
  };

  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <Card.Title>{order.carName}</Card.Title>
            <Card.Subtitle className="text-muted">{order.year}</Card.Subtitle>
          </Col>
          <Col>
            <Button className="float-end">Edytuj</Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Klient:</strong> {order.customerName}
        </Card.Text>
        <Card.Text>
          <strong>Koszt naprawy:</strong> {order.cost} zł
        </Card.Text>
        <Card.Text>
          <strong>Zysk:</strong> {order.profit} zł
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> {orderStatusText[order.status]}
        </Card.Text>
        <Card.Text>
          <strong>Termin realizacji:</strong> {order.dueDate}
        </Card.Text>
        <Card.Text>
          <strong>Opis:</strong> {order.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OrderDetails;
