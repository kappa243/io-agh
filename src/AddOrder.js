import React from "react";
import { useCallback } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addOrder } from "./model/order";

const AddOrder = () => {

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    const order = {
      car: {
        model: e.target.elements[0].value,
        year: Number(e.target.elements[1].value),
      },
      client: {
        firstName: e.target.elements[2].value,
        lastName: e.target.elements[3].value,
      },
      cost: Number(e.target.elements[4].value),
      profit: Number(e.target.elements[5].value),
      status: "IN_PROGRESS",
      dueDate: new Date(e.target.elements[6].value),
      description: e.target.elements[7].value,
    };
    await addOrder(order);
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Form.Label>Dane samochodu</Form.Label>
              <Form.Control type="text" placeholder="Model" />
              <Form.Control type="text" placeholder="Rok produkcji" />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="float-end">Zatwierdź</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form.Label>Dane klienta</Form.Label>
          <Form.Control type="text" placeholder="Imię" />
          <Form.Control type="text" placeholder="Nazwisko" />
          
          <Form.Label className="mt-3">Koszt naprawy</Form.Label>
          <Form.Control type="text" placeholder="Koszt naprawy" />
          
          <Form.Label className="mt-3">Zysk</Form.Label>
          <Form.Control type="text" placeholder="Zysk" />
          
          <Form.Label className="mt-3">Termin realizacji</Form.Label>
          <Form.Control type="text" placeholder="Termin realizacji" />
          
          <Form.Label className="mt-3">Opis</Form.Label>
          <Form.Control type="text" placeholder="Opis" />
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AddOrder;
