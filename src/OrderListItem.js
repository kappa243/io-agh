import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StatusPill = ({ status }) => {
  const statusToColor = {
    AWAITING_PARTS: "warning",
    IN_PROGRESS: "primary",
    DONE: "success",
  };

  return (
    <span className={`badge bg-${statusToColor[status]}`}>{status}</span>
  );
};

const OrderListItem = ({ onClick }) => {
  const order = {
    carName: "Fiat 126p",
    year: 1980,
    customerName: "Jan Kowalski",
    cost: 1000,
    profit: 500,
    status: "AWAITING_PARTS",
    dueDate: "2020-12-12",
  };

  return (
    <Card onClick={onClick}>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{order.carName}</Card.Title>
            <Card.Subtitle className="text-muted">{order.year}</Card.Subtitle>
          </Col>
          
          <Col>
            <Card.Text>{order.customerName}</Card.Text>
          </Col>

          <Col>
            <Card.Text>{order.cost}</Card.Text>
          </Col>

          <Col>
            <Card.Text>{order.profit}</Card.Text>
          </Col>

          <Col>
            <StatusPill status={order.status} />
          </Col>

          <Col>
            <Card.Text>{order.dueDate}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderListItem;
