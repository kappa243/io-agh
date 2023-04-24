import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { addOrder } from "./model/order";

const AddOrder = () => {
  const [carModel, setCarModel] = useState("");
  const [carProductionYear, setCarProductionYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [profit, setProfit] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const order = {
      car: {
        model: carModel,
        year: Number(carProductionYear),
      },
      client: {
        firstName: firstName,
        lastName: lastName,
      },
      cost: Number(repairCost),
      profit: Number(profit),
      dueDate: new Date(dueDate + "T" + dueTime),
      description: description,
      status: "IN_PROGRESS",
    };

    setCarModel("");
    setCarProductionYear("");
    setFirstName("");
    setLastName("");
    setRepairCost("");
    setProfit("");
    setDueDate("");
    setDueTime("");
    setDescription("");

    await addOrder(order);
  });

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Card>
        <Card.Header className="d-flex flex-column">
          <Form.Label>Dane samochodu</Form.Label>
          <div className="d-flex flex-row">
            <FloatingLabel label="Model" controlId="formCarModel" className="flex-fill">
              <Form.Control
                required
                type="text"
                placeholder="Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Rok produkcji" className="ms-2" controlId="formCarProductionYear">
              <Form.Control
                required
                type="number"
                placeholder="Rok produkcji"
                value={carProductionYear}
                onChange={(e) => setCarProductionYear(e.target.value)}
              />
            </FloatingLabel>
          </div>
        </Card.Header>

        <Card.Body>
          <Form.Label>Dane klienta</Form.Label>
          <Row className="g-2">
            <Col>
              <FloatingLabel label="Imię" controlId="formFirstName">
                <Form.Control
                  required
                  type="text"
                  placeholder="Imię"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Nazwisko" controlId="formLastName">
                <Form.Control
                  required
                  type="text"
                  placeholder="Nazwisko"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Form.Label className="mt-3">Dane zlecenia</Form.Label>
          <Row className="g-2">
            <Col>
              <FloatingLabel label="Koszt naprawy [zł]" controlId="formRepairCost">
                <Form.Control
                  required
                  type="number"
                  placeholder="Koszt naprawy [zł]"
                  value={repairCost}
                  onChange={(e) => setRepairCost(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Zysk [zł]" controlId="formProfit">
                <Form.Control
                  required
                  type="number"
                  placeholder="Zysk [zł]"
                  value={profit}
                  onChange={(e) => setProfit(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Termin realizacji" controlId="formDueDate">
                <Form.Control
                  type="date"
                  placeholder="Termin realizacji"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Termin realizacji" controlId="formDueDate">
                <Form.Control
                  type="time"
                  placeholder="Termin realizacji"
                  required
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel label="Opis zlecenia" controlId="formDescription" className="mt-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Opis zlecenia"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>

          <Button variant="primary" type="submit" className="mt-3">
            Zapisz zlecenie
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AddOrder;
