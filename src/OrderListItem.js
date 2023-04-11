import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

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
    carName: "Veryyyy long Fiat 126p",
    year: 1980,
    customerName: "Jan Kowalski",
    cost: 1000.00,
    profit: 500.00,
    status: "AWAITING_PARTS",
    dueDate: "2020-12-12",
  };

  return (
    <Card onClick={onClick} className="mt-3">
      <Card.Body>
        <Row>
          <Col xs={4}>
            <Card.Title>{order.carName}</Card.Title>
            <Card.Subtitle className="text-muted">{order.year}</Card.Subtitle>
          </Col>
          
          <Col xs={2}>
            <Card.Text>{order.customerName}</Card.Text>
          </Col>

          <Col xs={2} className="d-flex flex-column align-items-start">
            <div className="fw-bold d-flex justify-content-between w-100 gap-2">
              <Card.Text className="mb-0">{Number(order.cost).toFixed(2)}</Card.Text>
              <p className="mb-0">PLN</p>
            </div>
            <div className="d-flex justify-content-between w-100 gap-2">
              <Card.Text>{Number(order.profit).toFixed(2)}</Card.Text>
              <p>PLN</p>
            </div>
          </Col>

          <Col xs={2}>
            <StatusPill status={order.status} />
          </Col>

          <Col xs={2}>
            <Card.Text>{order.dueDate}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Badge pill className="bg-danger position-absolute top-100 start-100 translate-middle">2d</Badge>
    </Card>
  );
};

export default OrderListItem;
