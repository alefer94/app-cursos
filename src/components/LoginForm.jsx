import React, { useState } from "react";
import { Form, Button, Alert, Spinner, Container, Row, Col, Image , Card  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/images/banner.webp"; 
import api from "../services/api";
import logoImage from "../assets/images/logo.png"; 
const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "El nombre de usuario es requerido.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setLoginError("");

    try {

      
      const response = await api.post(
        "/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setLoginError(
        error.response?.data?.message || "Error al iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container fluid  className="vh-100 w-100" >
      <Row className="h-100">
        {/* Columna izquierda: Banner o imagen */}
        <Col md={6} className=" p-0 ">
          <Image
            src={bannerImage}
            alt="Banner"
            fluid
            className="h-100 w-100  "
            style={{ objectFit: "cover" }} 
          />
        </Col>

        
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center background-login">
        <Image
            src={logoImage}
            alt="Banner"
            fluid
            className=" mb-2  logo-im" 
            style={{ objectFit: "cover" , width: "250px"}} 
          />
          <Card className="w-75 shadow">
            <Card.Body>
             
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {loginError && (
                  <Alert variant="danger" className="mb-3">
                    {loginError}
                  </Alert>
                )}

                <Button type="submit" variant="primary" disabled={loading} className="w-100">
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Cargando...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;