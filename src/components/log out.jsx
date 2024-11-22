import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // O a la ruta raíz '/'
    window.location.reload();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <span className="material-icons">logout</span>
      <span className="menu-text">Cerrar sesión</span>
    </button>
  );
};

export default LogoutButton;
