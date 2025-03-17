// src/components/LoginForm.jsx
import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios"; // Importar axios
import { useNavigate } from "react-router-dom"; 


const LoginForm = () => {
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "", // Cambiado de "email" a "username"
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [loginError, setLoginError] = useState(""); // Estado para manejar errores de la API

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

    setLoading(true); // Activar el estado de carga
    setLoginError(""); // Limpiar errores anteriores

    try {
      // Hacer la petición POST a la API
      const response = await axios.post(
        "https://test-frontend-dev.onrender.com/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      // Manejar la respuesta exitosa
      const { access_token } = response.data;
     
      console.log("Token de acceso:", access_token);

      // Guardar el token en el localStorage o en el estado global
      localStorage.setItem("access_token", access_token);

      navigate("/modulos");
    } catch (error) {
      // Manejar errores de la API
      console.error("Error al iniciar sesión:", error);
      setLoginError(
        error.response?.data?.message || "Error al iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <InputField
        label="Nombre de usuario" // Cambiado de "Correo electrónico" a "Nombre de usuario"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      {loginError && <div className="api-error-message">{loginError}</div>}
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;