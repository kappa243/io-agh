import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import daysUntil from "./utils/dateConverter";
import { orderStatusColor, orderStatusText } from "./model/order";

const OrderListItem = ({ order, onClick }) => {

  const [badgeColor, setBadgeColor] = React.useState("primary");

  useEffect(() => {
    if (daysUntil(order.dueDate) < 3) {
      setBadgeColor("danger");
    } else if (daysUntil(order.dueDate) < 7) {
      setBadgeColor("warning");
    } else {
      setBadgeColor("primary");
    }
  }, [order.dueDate]);

  return (
    <Card onClick={onClick} className="mb-3" style={{ cursor: "pointer" }} >
      <Card.Body className="d-flex flex-direction-row">
        <div className="rounded-pill p-0 align-self-stretch" style={{ width: "0.5rem", backgroundColor: order.car.color }}></div>
        <Row className="align-items-center flex-fill">
          <Col xs={4} className="ps-4">
            <Card.Title>{order.car.model}</Card.Title>
            <Card.Subtitle className="text-muted">{order.car.year}</Card.Subtitle>
          </Col>

          <Col xs={2}>
            <Card.Text>{order.client.firstName} {order.client.lastName}</Card.Text>
          </Col>

          <Col xs={2} className="d-flex flex-column align-items-start">
            <div className="fw-bold d-flex justify-content-between w-100 gap-2">
              <Card.Text className="mb-0">{Number(order.cost).toFixed(2)}</Card.Text>
              <p className="mb-0">PLN</p>
            </div>
            <div className="d-flex justify-content-between w-100 gap-2">
              <Card.Text className="mb-0">{Number(order.profit).toFixed(2)}</Card.Text>
              <p className="mb-0">PLN</p>
            </div>
          </Col>

          <Col className="text-center" xs={2}>
            <Badge className={`bg-${orderStatusColor[order.status]}`}>{orderStatusText[order.status]}</Badge>
          </Col>

          <Col xs={2}>
            <Card.Text>{order.dueDate.toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Badge pill className={`bg-${badgeColor} position-absolute top-100 start-100 translate-middle`}>
        {daysUntil(order.dueDate) + "d"}
      </Badge>
    </Card>
  );
};

export default OrderListItem;
