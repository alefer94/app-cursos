import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import api from "../services/api";
import CursoImage from "../assets/images/curso.jpg"; 

const InicioPage = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await api.get("/api/modulos");
        setModulos(response.data);
      } catch (error) {
        console.error("Error al obtener los módulos:", error);
        setError("Error al cargar los módulos. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchModulos();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando módulos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <h1>Bienvenido Fernando</h1>
      <p>Selecciona una opción del menú para comenzar.</p>


      <Row className="mt-4">
        {modulos.map((modulo, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
            
              <Card.Img variant="top" src={CursoImage} />
              <Card.Body>
                <Card.Title>{modulo.titulo}</Card.Title>
                <Card.Text>{modulo.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InicioPage;
