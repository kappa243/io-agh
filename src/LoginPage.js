import React from "react";
import { useCallback } from "react";
import { Navigate } from "react-router-dom";
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
    <Container fluid style={{
      backgroundImage: "url(/bg.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover" }}>
      <Row className="vh-100 justify-content-center align-items-center">
        <Col md="8" lg="6" xl="5" xxl="4">
          <Form className="text-light bg-dark border p-4 rounded-4 bg-opacity-75" onSubmit={onSubmit}>
            <h1 className="mb-3 text-center">IO IO IO</h1>

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
              <Navigate to="/mechanic/home" />
            ) : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
