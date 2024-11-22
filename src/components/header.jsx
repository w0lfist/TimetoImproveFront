import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './log out';
import "./styles/header.css"

const Header = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user_name');
  
  // Estado para abrir/cerrar el menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Usamos useRef para referenciar el menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna entre abrir y cerrar el menú
  };

  // useEffect para cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el menú está abierto y el clic fue fuera del menú, se cierra
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Agrega el listener para los clics fuera del menú
    document.addEventListener('mousedown', handleClickOutside);

    // Limpia el listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      {/* Div superior */}
      <div className="header-top">
        <div className="title-div">
          <button className="title-button" onClick={() => navigate('/')}>
            <span className="title-text">TIME TO IMPROVE</span>
          </button>
        </div>

        {/* Si el usuario está logeado, mostrar el menú del usuario */}
        {token ? (
          <div className="menu-div" ref={menuRef}> {/* Referencia al menú */}
            <button className="menu-button" onClick={toggleMenu}>
              <span className="material-icons">menu</span>
            </button>
            {isMenuOpen && ( // Muestra el menú solo si isMenuOpen es true
              <div className="menu-content">
                <span className="user-name">
                  <span className="material-icons">person</span>
                  {userName}
                </span>
                <div className="menu-item" onClick={() => navigate('/user/settings')}>
                  <span className="material-icons">tune</span>
                  Ajustes
                </div>
                <LogoutButton />
              </div>
            )}
          </div>
        ) : (
          <div className="header-buttons">
            <button className="header-button-i" onClick={() => navigate('/')}>
              Iniciar Sesión
            </button>
            <button className="header-button-r" onClick={() => navigate('/user/new')}>
              Registrarse
            </button>
          </div>
        )}
      </div>

      {/* Div inferior */}
      <div className="header-bottom">
        {token && ( // Muestra el botón "Home" solo si hay un token
          <div className="custom-nav-button" onClick={() => navigate('/dashboard')}>
            <span className="material-icons">home</span>
            Home
          </div>
        )}
        <div className="custom-nav-button" onClick={() => navigate('/aprende-a-entrenar')}>
          <span className="material-symbols-outlined">
            exercise
          </span>
          Aprende a Entrenar
        </div>
      </div>
    </header>
  );
};

export default Header;