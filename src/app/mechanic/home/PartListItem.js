'use client';

import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import daysUntil from "@/utils/dateConverter";
import { orderStatusColor, orderStatusText } from "@/model/order";

const PartListItem = ({ part }) => {

  return (
    // <Card className="w-100">
    //   <Card.Body className="w-100">
        <Row>
          <Col>
            <Card.Text>
              <strong>Nazwa:</strong> {part.name}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              <strong>Cena:</strong> {Number(part.price).toFixed(2)} zł
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              <strong>Termin dostawy:</strong> {part.deliveryDate.toDate().toLocaleString("pl-PL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            })}
            </Card.Text>
          </Col>
        </Row>
    //   </Card.Body>
    // </Card>
  );
};

export default PartListItem;
