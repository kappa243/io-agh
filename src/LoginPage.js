import React from "react";
import { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const onSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form className="mt-4 border p-4 rounded-4 opacity-2" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="ten ze studentem" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="mail przed @" />
            </Form.Group>
 
            <Button variant="primary" type="submit">
              Zaloguj
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
