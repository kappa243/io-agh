import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import addOrder from "./logic/addOrder";
import { Timestamp } from "firebase/firestore";

const AddOrder = () => {

  const handleSubmit = () => {
    const order = {
      carName: "Fiat 126p",
      year: 1980,
      clientName: "Jan Kowalski",
      cost: Number(10 + Math.random() * (10000 - 10)).toFixed(2),
      profit: Number(10 + Math.random() * (1000 - 10)).toFixed(2),
      status: "IN_PROGRESS",
      dueDate: Timestamp.fromDate(new Date("2023-04-24 12:50")),
      description: "Dawno, dawno, dawno temu za siedmiogórozwierzogrodem żył Shrek. k.",
    };
    addOrder(order);
    alert("pyk pyk");
  };

  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <Card.Title>...</Card.Title>
            <Card.Subtitle className="text-muted">...</Card.Subtitle>
          </Col>
          <Col>
            <Button onClick={handleSubmit} className="float-end">Zatwierdź</Button>
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
