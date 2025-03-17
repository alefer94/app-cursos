
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCogs } from "react-icons/fa"; 
import ModulosPage from "./ModulosPage";
import "../App.css"; 
import InicioPage from "./Home";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("inicio");

  
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <Container fluid className="vh-100" > 
      <Row className="h-100">

        <Col md={2} className="color-sidebar p-3 border-end">
         
          <Button
            variant={activeSection === "inicio" ? "light" : "blue"}
            className="w-100 mb-2 text-sidebar"
            onClick={() => setActiveSection("inicio")}
          >
            <FaHome className="me-2" /> 
            Inicio
          </Button>
          <Button
            variant={activeSection === "modulos" ? "light" : "blue"}
            className="w-100 mb-2 text-sidebar"
            onClick={() => setActiveSection("modulos")}
          >
            <FaCogs className="me-2" /> 
            Módulos
          </Button>
          <Button variant="danger" className="w-100 mt-4" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Col>

       
        <Col md={10} className="p-4">
        {activeSection === "inicio" && <InicioPage />}

          {activeSection === "modulos" && <ModulosPage />}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
