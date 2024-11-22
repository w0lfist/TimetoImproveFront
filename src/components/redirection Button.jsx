import { useNavigate } from 'react-router-dom';

const RedirectionButton = ({ ruta, texto, icon }) => { // Añadimos la prop 'icon'
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ruta);
  };

  return (
    <button onClick={handleClick} className="redirection-button"> {/* Clase específica para el botón */}
      {icon} {/* Mostramos el ícono aquí */}
      {texto}
    </button>
  );
};

export default RedirectionButton;
