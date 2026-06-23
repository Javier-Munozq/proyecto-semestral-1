import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes/AppRoutes.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h1 style={{ textAlign: 'center', backgroundColor: '#4CAF50', color: 'white', padding: '10px' }}>
      Prueba de que el ci/cd esta funcionando correctamente
    </h1>
    <AppRoutes />
  </React.StrictMode>
);
