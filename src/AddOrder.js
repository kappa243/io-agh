import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { addOrder } from "./model/order";
import { Formik } from "formik";
import * as yup from "yup";
import { InputGroup } from "react-bootstrap";

const testCashValue = (value) => {
  const cashRegex = /^\d+(\.\d{1,2})?$/;
  return cashRegex.test(value);
};

const testVINNumber = (value) => {
  console.log(value);
  if (value == "") return false;
  const vinRegex = /^[A-HJ-NPR-Z0-9]{8}[0-9X][A-HJ-NPR-Z0-9]{8}$/;
  return vinRegex.test(value);
};

const testColorValue = (value) => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return colorRegex.test(value);
};


const AddOrder = () => {
  const validationSchema = yup.object().shape({
    carModel: yup
      .string()
      .required("Wymagane"),
    carProductionYear: yup
      .number()
      .min(1900)
      .max(new Date().getFullYear())
      .required("Wymagane"),
    carColor: yup
      .string()
      .test("is-color", "Niepoprawny format koloru", testColorValue)
      .required("Wymagane"),
    carVINNumber: yup
      .string()
      .required("Wymagane")
      .test("is-vin", "Niepoprawny numer VIN", testVINNumber),
    carMileage: yup
      .number()
      .min(0)
      .required("Wymagane"),
    firstName: yup
      .string()
      .required("Wymagane"),
    lastName: yup
      .string()
      .required("Wymagane"),
    repairCost: yup
      .number()
      .min(0)
      // .moreThan(yup.ref("profit"), "Koszt naprawy musi być większy od zysku")
      .test("is-decimal", "Niepoprawny format waluty", testCashValue)
      .required("Wymagane"),
    profit: yup
      .number()
      .min(0)
      // .lessThan(yup.ref("repairCost"), "Zysk musi być mniejszy od kosztu naprawy")
      .test("is-decimal", "Niepoprawny format waluty", testCashValue)
      .required("Wymagane"),
    dueDate: yup
      .date()
      .min(new Date(new Date() - 1)
        .toISOString()
        .split("T")[0], "Data musi być w przyszłości")
      .required("Wymagane"),
    description: yup
      .string()
      .required("Wymagane"),
  });

  const submitOrder = (values) => {
    addOrder({
      car: {
        model: values.carModel,
        year: values.carProductionYear,
        color: values.carColor,
        vin: values.carVINNumber,
        mileage: values.carMileage,
      },
      client: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      cost: values.repairCost,
      profit: values.profit,
      status: "IN_PROGRESS",
      dueDate: new Date(values.dueDate), // get Date instance instead of formatted string
      description: values.description,
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        carModel: "",
        carProductionYear: "",
        carColor: "#000000",
        carVINNumber: "",
        carMileage: 0,
        firstName: "",
        lastName: "",
        repairCost: 0,
        profit: 0,
        dueDate: new Date().toISOString().split("T")[0],
        description: "",
      }}
      onSubmit={(values, { resetForm }) => {
        submitOrder(values);
        resetForm();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Card>
            <Card.Header className="d-flex flex-column">
              <Form.Label>Dane samochodu</Form.Label>
              <div className="d-flex flex-row">
                <FloatingLabel label="Model" controlId="formCarModel" className="flex-fill">
                  <Form.Control
                    required
                    type="text"
                    name="carModel"
                    placeholder="Model"
                    value={values.carModel}
                    onChange={handleChange}
                    isInvalid={touched.carModel && errors.carModel}
                  />
                </FloatingLabel>
                <FloatingLabel label="Rok produkcji" className="ms-2" controlId="formCarProductionYear">
                  <Form.Control
                    required
                    type="number"
                    name="carProductionYear"
                    placeholder="Rok produkcji"
                    value={values.carProductionYear}
                    onChange={handleChange}
                    min="1900"
                    isInvalid={touched.carProductionYear && errors.carProductionYear}
                  />
                </FloatingLabel>
              </div>
              <div className="d-flex flex-row mt-2">
                <FloatingLabel label="Numer VIN" controlId="formVINNumber" className="flex-fill">
                  <Form.Control
                    required
                    type="text"
                    name="carVINNumber"
                    placeholder="Numer VIN"
                    value={values.carVINNumber}
                    onChange={handleChange}
                    isInvalid={touched.carVINNumber && errors.carVINNumber}
                  />
                </FloatingLabel>
                <FloatingLabel label="Kolor" controlId="formCarColor" className="ms-2 w-25">
                  <Form.Control className="w-100"
                    required
                    type="color"
                    name="carColor"
                    placeholder="Kolor"
                    value={values.carColor}
                    onChange={handleChange}
                    isInvalid={touched.carColor && errors.carColor}
                  />
                </FloatingLabel>
                <div className="ms-2 w-25">
                  <InputGroup>
                    <FloatingLabel label="Przebieg" controlId="formCarMileage">
                      <Form.Control
                        required
                        type="number"
                        name="carMileage"
                        placeholder="Przebieg"
                        value={values.carMileage}
                        onChange={handleChange}
                        min="0"
                        isInvalid={touched.carMileage && errors.carMileage}
                      />
                    </FloatingLabel>
                    <InputGroup.Text>km</InputGroup.Text>
                  </InputGroup>
                </div>
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
                      name="firstName"
                      placeholder="Imię"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={touched.firstName && errors.firstName}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel label="Nazwisko" controlId="formLastName">
                    <Form.Control
                      required
                      type="text"
                      name="lastName"
                      placeholder="Nazwisko"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={touched.lastName && errors.lastName}
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <Form.Label className="mt-3">Dane zlecenia</Form.Label>
              <Row className="g-2">
                <Col>
                  <InputGroup>
                    <FloatingLabel label="Koszt naprawy" controlId="formRepairCost">
                      <Form.Control
                        required
                        type="number"
                        name="repairCost"
                        placeholder="Koszt naprawy"
                        value={values.repairCost}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        isInvalid={touched.repairCost && errors.repairCost}
                      />
                    </FloatingLabel>
                    <InputGroup.Text>zł</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <FloatingLabel label="Zysk" controlId="formProfit">
                      <Form.Control
                        required
                        type="number"
                        name="profit"
                        placeholder="Zysk"
                        value={values.profit}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        isInvalid={touched.profit && errors.profit}
                      />
                    </FloatingLabel>
                    <InputGroup.Text>zł</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <FloatingLabel label="Termin realizacji" controlId="formDueDate">
                    <Form.Control
                      required
                      type="date"
                      name="dueDate"
                      placeholder="Termin realizacji"
                      value={values.dueDate}
                      onChange={handleChange}
                      isInvalid={touched.dueDate && errors.dueDate}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <FloatingLabel label="Opis zlecenia" controlId="formDescription" className="mt-3">
                <Form.Control
                  required
                  as="textarea"
                  rows={10}
                  name="description"
                  placeholder="Opis zlecenia"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && errors.description}
                />
              </FloatingLabel>
              <Button variant="primary" type="submit" className="mt-3">
                Zapisz zlecenie
              </Button>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrder;
