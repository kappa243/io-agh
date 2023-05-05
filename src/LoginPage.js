import React from "react";
import { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./logic/fb";
import { FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

function formatErrorMessage(error) {
  switch (error.code) {
    case "auth/user-not-found":
      return "Nie znaleziono użytkownika";

    case "auth/wrong-password":
      return "Błędne hasło";

    case "auth/network-request-failed":
      return "Błąd sieci. Napraw problemy z internetem";
  }

  return "Błąd wewnętrzny. Skontaktuj się z administratorem i podaj mu kod błędu: " + error.message;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const onSubmit = useCallback(data => {
    const email = data.email;
    const password = data.password;
    signInWithEmailAndPassword(email, password);

  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-top">
        <h1 className="mt-5 text-center mb-5 fs-1">IO IO IO</h1>
        <Col md="8" lg="6" xl="5" xxl="4">
          <Form noValidate className="bg-light border p-4 rounded-4" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-3 text-center fs-3">Zaloguj się</h2>

            <FloatingLabel label="Email" controlId="email" className="mb-3">
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Email"
                isInvalid={isSubmitted && errors.email}
                {...register("email", {
                  required: "Email jest wymagany",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Niepoprawny adres e-mail",
                  }
                })}
              />
            </FloatingLabel>

            <FloatingLabel label="Hasło" controlId="password" className="mb-3">
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Hasło"
                isInvalid={isSubmitted && errors.password}
                {...register("password", {
                  required: "Hasło jest wymagane"
                })}
              />
            </FloatingLabel>

            <div className="text-center mb-3">
              <Button variant="primary" type="submit">
                {
                  loading ? "Logowanie..." : "Zaloguj"
                }
              </Button>
            </div>

            <p className="text-danger align-self-center m-0">
              {
                errors.email && errors.email?.message ||
                errors.password && errors.password?.message ||
                error && formatErrorMessage(error)
              }
            </p>

            {user ? <Navigate to="/mechanic/home" /> : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
