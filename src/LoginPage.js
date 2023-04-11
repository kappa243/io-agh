import React from "react";
import { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./logic/fb";

const LoginPage = () => {
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    signInWithEmailAndPassword(email, password);
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
 
            {loading ? (
              <p className="mt-3">Ładowanie...</p>
            ) : error ? (
              <p className="mt-3 text-danger">{error.message}</p>
            ) : user ? (
              <p className="mt-3">Zalogowano</p>
            ) : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
