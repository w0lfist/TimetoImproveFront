import React from 'react';
import ReactDOM from 'react-dom/client'; // Usar 'react-dom' en versiones anteriores
import App from './App'; // Importa el componente principal de la aplicación
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

// Crea el punto de entrada para la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);