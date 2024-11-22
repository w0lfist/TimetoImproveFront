import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CreateTag({ fetchTasks }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedDay, setSelectedDay] = useState(""); // Día seleccionado
  const [routine, setRoutine] = useState(null); // Rutina seleccionada automáticamente

  const handleDaySelection = (day) => {
    setSelectedDay(day); // Actualiza el día seleccionado
    toast.dismiss(); // Cierra notificaciones previas si las hay
  };

  const handleSearchRoutine = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    try {
      const response = await axios.get(`${apiUrl}/api/routines/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.routine_name) {
        setRoutine({ name: response.data.routine_name });
        toast.success("¡Rutina encontrada exitosamente!");
      } else {
        toast.error("Rutina no encontrada.");
      }
    } catch (error) {
      toast.error("Error al obtener la rutina.");
    }
  };

  const handleCreateTag = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!routine) {
      toast.error("Primero debes buscar tu rutina.");
      return;
    }

    if (!selectedDay) {
      toast.error("Debes seleccionar un día para crear la tarjeta.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/tag/create`, 
        {
          user_id: userId,
          day: selectedDay,
          routine: routine.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedDay("");
      fetchTasks();
      toast.success(response.data.message || "Tarjeta creada con éxito.");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail || "Error al crear la tarjeta.");
      } else {
        toast.error("Error al crear la tarjeta.");
      }
    }
  };

  return (
    <div className="create-tag">
      <div className="introduction-tag">
        <h2>Crea tu tarjeta</h2>
      </div>
      <div className="createtag-form">
        <form>
          <div className="container-routinesearch">
            <button type="button" onClick={handleSearchRoutine} className="button-routine">
              Buscar rutina
            </button>
            {routine && (
              <>
                <p>Esta es tu rutina:</p>
                <textarea
                  value={typeof routine === "string" ? routine : routine.name || "Rutina no disponible"}
                  readOnly
                  className="box-routine-name"
                />
              </>
            )}
          </div>
          <div className="createtag-container">
            <label>¿Qué día vas a entrenar?</label>
            <ul className="day-list-createtag">
              {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((day) => (
                <li
                  key={day}
                  onClick={() => handleDaySelection(day)}
                  className={selectedDay === day ? "selected" : ""}
                >
                  {day}
                </li>
              ))}
            </ul>
          </div>
        </form>
        <div className="createone-tagbutton">
          <button type="button" onClick={handleCreateTag}>
            Crear Tarjeta
          </button>
        </div>
      </div>
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

export default CreateTag;
