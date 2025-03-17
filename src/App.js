
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ModulosPage from "./components/ModulosPage";
import ProtectedLayout from "./components/ProtectedRouters";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";


const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};


const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginForm />} />

        {/* Ruta protegida: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              }
            />
          }
        />

        {/* Ruta protegida: Módulos */}
        <Route
          path="/modulos"
          element={
            <ProtectedRoute
              element={
                <ProtectedLayout>
                  <ModulosPage />
                </ProtectedLayout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;