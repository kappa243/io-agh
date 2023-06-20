'use client';

import { useCallback, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { orderStatusColor, orderStatusText, updateOrder, partsCost, partsMaxDate, deleteOrder } from "@/model/order";
import EditOrder from "./EditOrder";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import PartListItem from "@/app/mechanic/home/PartListItem";
import { mailUpdateStatus } from "@/app/sendMail";

const AddPart = ({ order }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful } } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "0",
      deliveryDate: new Date().toISOString().split("T")[0],
    }
  });

  const submitPart = useCallback(async (data) => {
    if (isSubmitting) return;
    order.parts.push({
      name: data.formPartName,
      price: data.formPartPrice,
      deliveryDate: new Date(data.formPartDeliveryDate)
    });

    updateOrder(order);
  }, [isSubmitting]);

  return (
    <>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit(submitPart)}>
          <Row className="g-2">
            <Col>
              <FloatingLabel label="Nazwa" controlId="formPartName">
                <Form.Control
                  required
                  type="text"
                  name="formPartName"
                  placeholder="Nazwa"
                  isInvalid={errors.formPartName}
                  isValid={isSubmitted && !errors.formPartName}
                  {...register("formPartName", {
                    required: "Wymagane"
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.formPartName?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Cena" controlId="formPartPrice">
                <Form.Control
                  required
                  type="number"
                  name="formPartPrice"
                  placeholder="Cena"
                  min="0"
                  step="0.01"
                  isInvalid={errors.formPartPrice}
                  isValid={isSubmitted && !errors.formPartPrice}
                  {...register("formPartPrice", {
                    required: "Wymagane"
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.formPartPrice?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Termin dostawy" controlId="formPartDeliveryDate">
                <Form.Control
                  required
                  type="date"
                  name="formPartDeliveryDate"
                  placeholder="Termin dostawy"
                  isInvalid={errors.formPartDeliveryDate}
                  isValid={isSubmitted && !errors.formPartDeliveryDate}
                  {...register("formPartDeliveryDate", {
                    required: "Wymagane",
                    validate: (value) => {
                      const today = new Date().setHours(0, 0, 0, 0);
                      const date = new Date(value);
                      return date >= today || "Termin nie może poprzedzać dzisiejszej daty";
                    }
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.formPartDeliveryDate?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <Button type="submit">
                <FaPlus />
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body >
    </>
  );
};

export default AddPart;
