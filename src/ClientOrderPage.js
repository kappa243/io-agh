import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getOrder, orderStatusText, orderStatusColor } from "./model/order";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";

/*
  Simple page that displays order details.
  It uses URL query parameter to get order ID.
  Probably needs some styling (order progress bar).
  In future it should also allow to select car parts.
*/

const ClientOrderPage = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrder = async(orderId) => {
      try {
        const result = await getOrder(orderId);
        setOrder(result);
      } catch (error) {
        console.error(error);
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("orderId");
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [location]);

  return (
    <>
      {order && (
        <Container className="mt-3">
          <Card>
            <Card.Header>
              <h2>Zlecenie {order.id}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>VIN:</strong> {order.car.vin}
              </Card.Text>
              <Card.Text>
                <strong>Opis:</strong> {order.description}
              </Card.Text>
              <Card.Text>
                <strong>Przewidywana data ukończenia:</strong> {order.dueDate.toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Card.Text>
              <Card.Text>
                <strong>Status: </strong>
                <Badge variant={orderStatusColor[order.status]}>
                  {orderStatusText[order.status]}
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ClientOrderPage;
