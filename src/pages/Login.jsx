import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Maneja el cambio de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Enviar los datos a la ruta del token
        const response = await axios.post(`${apiUrl}/token`, 
            new URLSearchParams({
                username: formData.username,
                password: formData.password
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        // Almacenar el token en localStorage
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_id", response.data.user_id); 
        localStorage.setItem("user_name", response.data.user_name); // Añadir esta línea
        // Redirigir según el resultado del inicio de sesión
        const redirectUrl = response.data.first_login ? "/create-tags" : "/dashboard"; // Obtener URL de redirección

        // Redirigir a la URL correspondiente
        navigate(redirectUrl);

        console.log("Token stored:", response.data.access_token);
        setError(null); // Limpiar errores previos
    } catch (error) {
        console.error("Error logging in:", error);
        setError("Login failed. Please check your credentials.");
    }
};


  return (
    <div className="login-space">
      <img src="../../multimedia/images/Logos/EkwABBuSQ2O9JZiyfc9Cpw.png" alt="TIME TO IMPROVE LOGO" className="timetoimprove-logo"/>
      <h1 className="welcome">Bienvenido a Time to Improve</h1>
      <div className="register">
        <h2 className="welcome-two">Unete y empieza tu cambio ahora!</h2> 
        <button className="register-button" onClick={() => navigate('/user/new')}>
              Registrate
            </button>
        </div>
      <div className="subtittle">
      <p className="question">¿Ya tienes una cuenta?</p>  
      <p className="tittle">Inicia Sesion</p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="form-login">
      <form onSubmit={handleSubmit}>
        <div className="input-username">
          <label htmlFor="username" className="label-name">Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="ingresa tu nombre de usuario"
            required
            className="username-box"
          />
        </div>
        <div className="input-password">
          <label htmlFor="password" className="label-pass">contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="ingresa tu contraseña"
            required
            className="password-box"
          />
        </div>
        <button type="submit" className="login-button">Iniciar Sesion</button>
        
      </form>
      </div>
    </div>
  );
}

export default Login;
