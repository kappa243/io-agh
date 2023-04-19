import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { orderStatusColor, orderStatusText } from "./model/order";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

const OrderDetails = ({ order }) => {


  const handleStatusChange = (status) => {
    // TODO backend call here
    order.status = status; // to be removed after backend integration
  };

  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <Card.Title>{order.car.model}</Card.Title>
            <Card.Subtitle className="text-muted">{order.car.year}</Card.Subtitle>
          </Col>
          <Col className="d-flex flex-row-reverse gap-2">
            <Button>Edytuj</Button>
            <Dropdown as={ButtonGroup} style={{ width: "180px" }}>
              <DropdownToggle variant={orderStatusColor[order.status]} className="w-100">
                {orderStatusText[order.status]}
              </DropdownToggle>
              <DropdownMenu className="w-100">
                {Object.keys(orderStatusText).map((status, index) => (
                  <DropdownItem onClick={() => handleStatusChange(status)} key={index} active={status === order.status}>{orderStatusText[status]}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="d-flex gap-3">
        <div className="w-50">
          <Card.Text>
            <strong>Klient:</strong> {order.client.firstName} {order.client.lastName}
          </Card.Text>
          <Card.Text>
            <strong>Nr tel.:</strong> {order.client.phoneNumber}
          </Card.Text>
          <Card.Text>
            <strong>E-mail:</strong> {order.client.email}
          </Card.Text>
          <Card.Text>
            <strong>Koszt naprawy:</strong> {Number(order.cost).toFixed(2)} zł
          </Card.Text>
          <Card.Text>
            <strong>Zysk:</strong> {Number(order.profit).toFixed(2)} zł
          </Card.Text>
          <Card.Text>
            <strong>Termin realizacji:</strong> {order.dueDate.toLocaleDateString("pl-PL")}
          </Card.Text>
        </div>
        <Card.Text className="w-50">
          <strong>Opis:</strong> {order.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OrderDetails;
