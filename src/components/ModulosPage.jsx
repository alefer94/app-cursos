import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Accordion, ProgressBar ,Image } from "react-bootstrap";
import { FaCheckCircle, FaCircle } from "react-icons/fa"; 
import api from "../services/api";
import "../App.css"; 
import ImageBannR from "../assets/images/Web-Desktop.png"; 
const ModulosPage = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedClase, setSelectedClase] = useState(null);

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

  const handleClaseClick = (clase) => {
    setSelectedClase(clase);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Módulos</h1>
      <Row>
        <Col md={9}>
          {selectedClase ? (
            <Card>
              <Card.Body>
                <Card.Title className="titulo-clase">{selectedClase.titulo}</Card.Title>
                {selectedClase.video && (
                  <div className="mt-3">
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${selectedClase.video.split("v=")[1]}`}
                      title={selectedClase.titulo}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <Card.Text>{selectedClase.descripcion}</Card.Text>
                <p>
                  <strong>Duración:</strong> {selectedClase.duracion}
                </p>

         
                <p>
                  <strong>Estado</strong>{" "}
                  
                </p>


                <ProgressBar
                  now={selectedClase.completado ? 100 : 50} 
                  label={`${selectedClase.completado ? "100%" : "50%"}`}
                  variant={selectedClase.completado ? "success" : "danger"} 
                />
              </Card.Body>
            </Card>
          ) : (
            <Image
            src={ImageBannR}
            alt="Banner"
            fluid
            className="h-100 w-100  "
            style={{ objectFit: "cover" }} 
          />
          )}
        </Col>

        <Col md={3}>
          <Accordion>
            {modulos.map((modulo, index) => (
              <Accordion.Item eventKey={String(index)} key={index}>
                <Accordion.Header>{modulo.titulo}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {modulo.clases.map((clase, idx) => (
                      <ListGroup.Item
                        key={idx}
                        onClick={() => handleClaseClick(clase)}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                       
                        {clase.completado ? (
                          <FaCheckCircle className="me-2 text-success" />
                        ) : (
                          <FaCircle className="me-2 text-danger" />
                        )}
                        {clase.titulo}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default ModulosPage;
