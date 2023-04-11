import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const AddOrder = () => {
  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <Card.Title>...</Card.Title>
            <Card.Subtitle className="text-muted">...</Card.Subtitle>
          </Col>
          <Col>
            <Button className="float-end">Zatwierdź</Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Klient:</strong> ...
        </Card.Text>
        <Card.Text>
          <strong>Koszt naprawy:</strong> ... zł
        </Card.Text>
        <Card.Text>
          <strong>Zysk:</strong> ... zł
        </Card.Text>
        <Card.Text>
          <strong>Termin realizacji:</strong> ...
        </Card.Text>
        <Card.Text>
          <strong>Opis:</strong> ... ... ...
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AddOrder;
