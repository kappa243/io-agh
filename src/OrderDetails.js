import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { orderStatusText } from "./model/order";

const OrderDetails = ({ order }) => {
  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <Card.Title>{order.car.model}</Card.Title>
            <Card.Subtitle className="text-muted">{order.car.year}</Card.Subtitle>
          </Col>
          <Col className="d-flex flex-row-reverse gap-2">
            <Button className="btn-danger">Usuń</Button>
            <Button>Edytuj</Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Klient:</strong> {order.client.firstName} {order.client.lastName}
        </Card.Text>
        <Card.Text>
          <strong>Koszt naprawy:</strong> {Number(order.cost).toFixed(2)} zł
        </Card.Text>
        <Card.Text>
          <strong>Zysk:</strong> {Number(order.profit).toFixed(2)} zł
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> {orderStatusText[order.status]}
        </Card.Text>
        <Card.Text>
          <strong>Termin realizacji:</strong> {order.dueDate.toLocaleDateString("pl-PL")}
        </Card.Text>
        <Card.Text>
          <strong>Opis:</strong> {order.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OrderDetails;
