import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Importar axios
import Header from "../components/header";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import beginnerImage from '../../public/multimedia/images/routines/beginner/beginner.jpg';
import intermediateImage from '../../public/multimedia/images/routines/intermediate/intermediate.jpg';
import advancedImage from '../../public/multimedia/images/routines/advance/advanced.jpg';
import "./styles/createtags.css"

function CreateTags() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedDay, setSelectedDay] = useState('');
  const [routine, setRoutine] = useState(null);
  const navigate = useNavigate();
  const imageRoutineList = {
    "cuerpo completo principiante": beginnerImage,
    "cuerpo completo intermedio": intermediateImage,
    "cuerpo completo avanzado": advancedImage,
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("No estás autenticado, por favor inicia sesión.");
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/check-user-status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.first_login) {
            navigate('/dashboard');
          }
        } else {
          toast.error("Error al verificar el estado del usuario.");
        }
      } catch (error) {
        toast.error("Ocurrió un error al conectar con el servidor.");
      }
    };

    checkUserStatus();
  }, [navigate]);

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const handleRoutineSelection = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/assign-routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.routine_name) {
          setRoutine({ name: data.routine_name });
          toast.success("Rutina asignada correctamente.");
        } else {
          toast.warning("No se encontró una rutina acorde.");
        }
      } else {
        toast.error("Error al asignar la rutina.");
      }
    } catch (error) {
      toast.error("Ocurrió un error al asignar la rutina.");
    }
  };

  const getRoutineImage = (routineName) => {
    if (!routineName) return null;

    const lowerCaseName = routineName.toLowerCase();
    if (lowerCaseName.includes("cuerpo completo") && lowerCaseName.includes("principiante")) {
      return imageRoutineList["cuerpo completo principiante"];
    } else if (lowerCaseName.includes("cuerpo completo") && lowerCaseName.includes("intermedio")) {
      return imageRoutineList["cuerpo completo intermedio"];
    } else if (lowerCaseName.includes("cuerpo completo") && lowerCaseName.includes("avanzado")) {
      return imageRoutineList["cuerpo completo avanzado"];
    }

    return null;
  };

  const handleCreateTag = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (!routine) {
      toast.error("Primero debes seleccionar una rutina.");
      return;
    }

    if (!selectedDay) {
      toast.warning("Selecciona un día antes de crear la tarjeta.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/tag/create`, 
        {
          user_id: userId,
          day: selectedDay,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedDay('');
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Error al crear la tarjeta.";
      toast.error(errorMessage);
    }
  };

  const handleFinish = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
      const tagsResponse = await axios.get(`${apiUrl}/api/tags/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (tagsResponse.data && tagsResponse.data.length > 0) {
        const updateResponse = await fetch(`${apiUrl}/api/users/${userId}/first_login`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ first_login: false }),
        });

        if (updateResponse.ok) {
          toast.success("Estado actualizado. ¡Bienvenido al Dashboard!");
          navigate('/dashboard');
        } else {
          toast.error("Error al actualizar el estado de inicio.");
        }
      } else {
        toast.warning("Debes crear al menos una tarjeta antes de continuar.");
      }
    } catch (error) {
      toast.error("Ocurrió un error al verificar las tarjetas.");
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="info-containers">
        <div className="create-tags">
          <h1>¡Empecemos!</h1>
          <div className="introduction-tags">
            <h2>Creemos las tarjetas para organizar tus entrenamientos a lo largo de la semana</h2>
          </div>
          <div className="cratetags-form">
            <form>
              <div className="container-rutineassign">
                <p>Primero te asignaremos una rutina acorde a tu nivel.</p>
                <label>Pincha aquí:
                  <button type="button" onClick={handleRoutineSelection} className="button-routine">
                    Seleccionar Rutina
                  </button>
                </label>
                {routine && (
                  <>
                    <p>Esta será tu rutina:</p>
                    <input type="text" value={routine.name} readOnly />
                    <div className="routines-img">
                      <img src={getRoutineImage(routine.name)} alt={routine.name} />
                    </div>
                  </>
                )}
              </div>
              <div className="createtag-container">
                <p>¿Qué día vas a entrenar?</p>
                <ul className="day-list">
                  {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map(day => (
                    <li
                      key={day}
                      onClick={() => handleDaySelection(day)}
                      className={selectedDay === day ? 'selected' : ''}
                    >
                      {day}
                    </li>
                  ))}
                </ul>
                <div className="createtag-button">
                  <p>Crea tu tarjeta y repite por cada día que vayas a entrenar</p>
                  <button type="button" onClick={handleCreateTag}>
                    Crear Tarjeta
                  </button>
                </div>
                <p>¿Creaste tus tarjetas? ¡Entonces comencemos!</p>
                <button type="button" onClick={handleFinish} className="button-finish">
                  Terminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default CreateTags;