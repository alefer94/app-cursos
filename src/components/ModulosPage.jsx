// src/components/ModulosPage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api"; // Importar el servicio de API

const ModulosPage = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await api.get("/api/modulos"); // Hacer la petición GET
        setModulos(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al obtener los módulos:", error);
        setError("Error al cargar los módulos. Inténtalo de nuevo.");
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchModulos();
  }, []);

  if (loading) {
    return <div>Cargando módulos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="modulos-container">
      <h1>Módulos Disponibles</h1>
      {modulos.map((modulo, index) => (
        <div key={index} className="modulo-card">
          <h2>{modulo.titulo}</h2>
          <p>{modulo.descripcion}</p>
          <h3>Clases:</h3>
          <ul>
            {modulo.clases.map((clase, idx) => (
              <li key={idx} className="clase-item">
                <h4>{clase.titulo}</h4>
                <p>{clase.descripcion}</p>
                <p>Duración: {clase.duracion}</p>
                <p>
                  Estado:{" "}
                  {clase.completado ? (
                    <span className="completado">Completado</span>
                  ) : (
                    <span className="no-completado">No completado</span>
                  )}
                </p>
                <a href={clase.video} target="_blank" rel="noopener noreferrer">
                  Ver video
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ModulosPage;