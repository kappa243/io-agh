import React, { useCallback, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import { addOrder } from "./model/order";
import "./utils/spinner.css";


const AddOrder = () => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful } } = useForm({
    mode: "onChange",
    defaultValues: {
      carModel: "",
      carProductionYear: "",
      carColor: "#000000",
      carVINNumber: "",
      carMileage: "0",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      repairCost: "0",
      profit: "0",
      dueDate: new Date().toISOString().split("T")[0],
      description: "",
    }
  });

  const submitOrder = useCallback(async (data) => {
    if (isSubmitting) return;
    await addOrder({
      car: {
        model: data.carModel,
        year: data.carProductionYear,
        color: data.carColor,
        vin: data.carVINNumber,
        mileage: data.carMileage,
      },
      client: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
      },
      cost: data.repairCost,
      profit: data.profit,
      status: "IN_PROGRESS",
      dueDate: new Date(data.dueDate), // get Date instance instead of formatted string
      description: data.description
    });
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={`form-container ${isSubmitting ? "submitting" : ""}`}>
      <div className="form-overlay rounded">
        {isSubmitting &&
          <>
            <Spinner variant="light" animation="border" size="lg" />
          </>
        }
      </div>
      <Form noValidate onSubmit={handleSubmit(submitOrder)}>
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
                  isInvalid={errors.carModel}
                  isValid={isSubmitted && !errors.carModel}
                  {...register("carModel", {
                    required: "Wymagane"
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.carModel?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label="Rok produkcji" className="ms-2 w-25" controlId="formCarProductionYear">
                <Form.Control
                  required
                  type="number"
                  name="carProductionYear"
                  placeholder="Rok produkcji"
                  min="1900"
                  max={new Date().getFullYear()}
                  step="1"
                  isInvalid={errors.carProductionYear}
                  isValid={isSubmitted && !errors.carProductionYear}
                  {...register("carProductionYear", {
                    required: "Wymagane",
                    min: {
                      value: 1900,
                      message: "Rok produkcji musi być większy niż 1900",
                    },
                    max: {
                      value: new Date().getFullYear(),
                      message: `Rok produkcji musi być mniejszy niż ${new Date().getFullYear()}`,
                    },
                    pattern: {
                      value: /^[0-9]{4}$/,
                      message: "Niepoprawny format roku",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.carProductionYear?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>
            <div className="d-flex flex-row mt-2">
              <FloatingLabel label="Numer VIN" controlId="formVINNumber" className="flex-fill">
                <Form.Control
                  required
                  type="text"
                  name="carVINNumber"
                  placeholder="Numer VIN"
                  isInvalid={errors.carVINNumber}
                  isValid={isSubmitted && !errors.carVINNumber}
                  {...register("carVINNumber", {
                    required: "Wymagane",
                    pattern: {
                      value: /^[A-HJ-NPR-Z0-9]{8}[0-9X][A-HJ-NPR-Z0-9]{8}$/,
                      message: "Niepoprawny numer VIN",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.carVINNumber?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label="Kolor" controlId="formCarColor" className="ms-2 w-25">
                <Form.Control className="w-100"
                  required
                  type="color"
                  name="carColor"
                  placeholder="Kolor"
                  isInvalid={errors.carColor}
                  isValid={isSubmitted && !errors.carColor}
                  {...register("carColor", {
                    required: "Wymagane",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.carColor?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Form.Group className="ms-2 w-25" controlId="formCarMileage">
                <InputGroup>
                  <FloatingLabel label="Przebieg">
                    <Form.Control
                      required
                      type="number"
                      name="carMileage"
                      placeholder="Przebieg"
                      min="0"
                      step="1"
                      isInvalid={errors.carMileage}
                      isValid={isSubmitted && !errors.carMileage}
                      {...register("carMileage", {
                        required: "Wymagane",
                        min: {
                          value: 0,
                          message: "Przebieg musi być większy niż 0",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Niepoprawny format przebiegu",
                        },
                      })}
                    />
                  </FloatingLabel>
                  <InputGroup.Text>km</InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback style={{ display: "block" }} type="invalid">
                  {errors.carMileage?.message}
                </Form.Control.Feedback>
              </Form.Group>
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
                    isInvalid={errors.firstName}
                    isValid={isSubmitted && !errors.firstName}
                    {...register("firstName", {
                      required: "Wymagane",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="Nazwisko" controlId="formLastName">
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    placeholder="Nazwisko"
                    isInvalid={errors.lastName}
                    isValid={isSubmitted && !errors.lastName}
                    {...register("lastName", {
                      required: "Wymagane",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2 mt-1">
              <Col>
                <FloatingLabel label="Nr. Telefonu" controlId="formPhoneNumber">
                  <Form.Control
                    required
                    type="tel"
                    name="phoneNumber"
                    placeholder="Nr. Telefonu"
                    isInvalid={errors.phoneNumber}
                    isValid={isSubmitted && !errors.phoneNumber}
                    {...register("phoneNumber", {
                      required: "Wymagane",
                      pattern: {
                        value: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/,
                        message: "Niepoprawny numer telefonu",
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="E-mail" controlId="formEmail">
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    isInvalid={errors.email}
                    isValid={isSubmitted && !errors.email}
                    {...register("email", {
                      required: "Wymagane",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Niepoprawny adres e-mail",
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Form.Label className="mt-3">Dane zlecenia</Form.Label>
            <Row className="g-2">
              <Col>
                <Form.Group controlId="formRepairCost">
                  <InputGroup>
                    <FloatingLabel label="Koszt naprawy" >
                      <Form.Control
                        required
                        type="number"
                        name="repairCost"
                        placeholder="Koszt naprawy"
                        min="0"
                        step="0.01"
                        isInvalid={errors.repairCost}
                        isValid={isSubmitted && !errors.repairCost}
                        {...register("repairCost", {
                          required: "Wymagane",
                          min: {
                            value: 0,
                            message: "Koszt naprawy musi być większy niż 0",
                          },
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Niepoprawny format",
                          },
                        })}
                      />
                    </FloatingLabel>
                    <InputGroup.Text>zł</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback style={{ display: "block" }} type="invalid">
                    {errors.repairCost?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formProfit">
                  <InputGroup>
                    <FloatingLabel label="Zysk">
                      <Form.Control
                        required
                        type="number"
                        name="profit"
                        placeholder="Zysk"
                        min="0"
                        step="0.01"
                        isInvalid={errors.profit}
                        isValid={isSubmitted && !errors.profit}
                        {...register("profit", {
                          required: "Wymagane",
                          min: {
                            value: 0,
                            message: "Zysk musi być większy niż 0",
                          },
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Niepoprawny format",
                          },
                        })}
                      />
                    </FloatingLabel>
                    <InputGroup.Text>zł</InputGroup.Text>
                    <Form.Control.Feedback style={{ display: "block" }} type="invalid">
                      {errors.profit?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <FloatingLabel label="Termin realizacji" controlId="formDueDate">
                  <Form.Control
                    required
                    type="date"
                    name="dueDate"
                    placeholder="Termin realizacji"
                    isInvalid={errors.dueDate}
                    isValid={isSubmitted && !errors.dueDate}
                    {...register("dueDate", {
                      required: "Wymagane",
                      validate: (value) => {
                        const today = new Date().setHours(0, 0, 0, 0);
                        const date = new Date(value);
                        return date >= today || "Termin nie może poprzedzać dzisiejszej daty";
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dueDate?.message}
                  </Form.Control.Feedback>
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
                isInvalid={errors.description}
                isValid={isSubmitted && !errors.description}
                {...register("description", {
                  required: "Wymagane",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3">
              Zapisz zlecenie
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default AddOrder;
