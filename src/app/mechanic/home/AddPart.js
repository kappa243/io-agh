'use client';

import { useCallback, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { BiCopy } from "react-icons/bi";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { orderStatusColor, orderStatusText, updateOrder, partsCost, partsMaxDate, deleteOrder } from "@/model/order";
import EditOrder from "./EditOrder";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import PartListItem from "@/app/mechanic/home/PartListItem";
import { mailUpdateStatus } from "@/app/sendMail";

const AddPart = ({ order }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful } } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      profit: "0",
      deliveryDate: new Date().toISOString().split("T")[0],
    }
  });

  const submitPart = useCallback((event) => {
    event.preventDefault();
    let data = event.target.elements;
    order.parts.push({
      name: data.formPartName.value,
      price: data.formPartPrice.value,
      deliveryDate: new Date(data.formPartDeliveryDate.value)
    });

    updateOrder(order);
  });

  return (
    <>
      <Form noValidate onSubmit={submitPart}>
        <Row className="g-2">
          <Col>
            <FloatingLabel label="Nazwa" controlId="formPartName">
              <Form.Control
                required
                type="text"
                name="formPartName"
                placeholder="Nazwa"
              />
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
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Termin dostawy" controlId="formPartDeliveryDate">
              <Form.Control
                required
                type="date"
                name="formPartDeliveryDate"
                placeholder="Termin dostawy"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Button type="submit">
              <FaPlus />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddPart;
