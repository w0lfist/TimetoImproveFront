import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles/FbRoutine.css";
import Header from "../components/header";
import Footer from "../components/footer";
import exerciseList from "../components/exercisesList";

function AdvanceFbRoutine() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [routine, setRoutine] = useState({});
  const [timers, setTimers] = useState({});
  const [exerciseRestTimers, setExerciseRestTimers] = useState({});
  const [repeticionesMaximas, setRepeticionesMaximas] = useState({});
  const [repeticiones70, setRepeticiones70] = useState({});

  const findExerciseVideo = (exerciseName) => {
    const exerciseKey = Object.keys(exerciseList).find(
      (key) => key.toLowerCase() === exerciseName.toLowerCase()
    );
    const video = exerciseKey ? exerciseList[exerciseKey][0] : null;
    return video;
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    async function fetchRoutine() {
      try {
        const res = await axios.get(
          `${apiUrl}/api/routines/Advance/user/${userId}`
        );
        setRoutine(res.data);
        initializeTimers(res.data.exercises);
      } catch (error) {
        console.error("Error fetching routine:", error);
      }
    }
    fetchRoutine();
  }, []);

  const handleCompleteRoutine = async () => {
    const taskId = localStorage.getItem("current_task_id");
    if (!taskId) {
      console.error(
        "No se encontró el ID de la tarjeta en el almacenamiento local."
      );
      return;
    }

    try {
      await axios.put(`${apiUrl}/api/tag/user/${taskId}`, {
        state: "Completada",
      });
      console.log(`Estado de la tarea actualizado a "Completada"`);

      localStorage.removeItem("current_task_id");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error al actualizar el estado de la tarea:",
        error.response?.data || error.message
      );
    }
  };

  const initializeTimers = (exercises) => {
    let initialTimers = {};
    exercises.forEach((exercise, index) => {
      initialTimers[`exercise_${index}`] = Array.from(
        { length: exercise.sets },
        () => exercise.rest_between_sets
      );
    });
    setTimers(initialTimers);
  };

  const startTimer = (exerciseIndex, setIndex) => {
    const timerKey = `exercise_${exerciseIndex}`;
    const newTimers = { ...timers };

    // Verificar si el temporizador ya está en ejecución para este set
    if (
      newTimers[timerKey][setIndex] > 0 &&
      !newTimers[`isRunning_${timerKey}_${setIndex}`]
    ) {
      newTimers[`isRunning_${timerKey}_${setIndex}`] = true; // Marcar el temporizador como en ejecución
      const countdown = setInterval(() => {
        const updatedTimers = { ...newTimers };
        if (updatedTimers[timerKey][setIndex] > 0) {
          updatedTimers[timerKey][setIndex] -= 1; // Decrementar el tiempo restante
          setTimers(updatedTimers);
        } else {
          clearInterval(countdown); // Limpiar el intervalo cuando llega a 0
          updatedTimers[`isRunning_${timerKey}_${setIndex}`] = false; // Marcar el temporizador como no en ejecución
        }
      }, 1000);
    }
  };

  const startExerciseRestTimer = (exerciseIndex) => {
    // Limpiar el temporizador anterior si ya está corriendo
    if (exerciseRestTimers[exerciseIndex]) {
      clearInterval(exerciseRestTimers[exerciseIndex]);
    }

    const countdown = routine.rest_between_exercises; // Obtener el tiempo de descanso entre ejercicios
    let timeLeft = countdown;

    // Verificar si ya está en ejecución para evitar múltiples inicios
    if (!exerciseRestTimers[exerciseIndex]) {
      const interval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft -= 1; // Decrementar el tiempo restante
          setExerciseRestTimers((prevTimers) => ({
            ...prevTimers,
            [exerciseIndex]: timeLeft, // Guardar el tiempo restante en el índice correspondiente
          }));
        } else {
          clearInterval(interval); // Limpiar el intervalo cuando llega a 0
          setExerciseRestTimers((prevTimers) => ({
            ...prevTimers,
            [exerciseIndex]: null, // Limpiar el estado del temporizador
          }));
        }
      }, 1000);

      setExerciseRestTimers((prevTimers) => ({
        ...prevTimers,
        [exerciseIndex]: interval, // Guardar el nuevo temporizador en el estado
      }));
    }
  };
  const handleRepeticionesMaximasChange = (exerciseIndex, e) => {
    const value = e.target.value;
    setRepeticionesMaximas((prev) => ({ ...prev, [exerciseIndex]: value }));

    // Calcula el 70% y redondea al entero más cercano
    const calculo = Math.round(value * 0.7);
    setRepeticiones70((prev) => ({ ...prev, [exerciseIndex]: calculo }));
  };

  

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main-container">
      <Header />

      <div className="info-container">
        <h1>{routine.name}</h1>

        {routine.exercises &&
          routine.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="exercise-container">
              <h2>{exercise.name}</h2>

              {/* Mostrar imágenes específicas del ejercicio */}
              <div className="exercise-images">
                {findExerciseVideo(exercise.name) ? (
                  <video
                    src={findExerciseVideo(exercise.name)}
                    alt={exercise.name}
                    autoPlay
                    loop
                    controls
                    className="exercise-video"
                  />
                ) : (
                  <p>Video no disponible para {exercise.name}</p>
                )}
              </div>

              {/* Input para Repeticiones Máximas */}
              <div className="max-repetitions">
                {/* Input para Repeticiones Máximas */}
                <label htmlFor={`repeticionesMaximas_${exerciseIndex}`}>
                  Repeticiones Máximas:
                </label>
                <input
                  type="number"
                  id={`repeticionesMaximas_${exerciseIndex}`}
                  value={repeticionesMaximas[exerciseIndex] || ""}
                  onChange={(e) =>
                    handleRepeticionesMaximasChange(exerciseIndex, e)
                  }
                />
              </div>

              <div></div>

              <div className="exercise-details">
                {Array.from({ length: exercise.sets }, (_, setIndex) => (
                  <div key={setIndex} className="set-container">
                    <label>
                      Serie {setIndex + 1}:
                      <input
                        type="text"
                        value={repeticiones70[exerciseIndex] || 0}
                        readOnly
                      />
                    </label>
                    <div className="timer-container">
                      <span>
                        {(timers[`exercise_${exerciseIndex}`] &&
                          timers[`exercise_${exerciseIndex}`][setIndex]) ||
                          0}
                        s
                      </span>
                      <button
                        onClick={() => startTimer(exerciseIndex, setIndex)}
                      >
                        Iniciar descanso
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="exercise-break">
                <h3>{routine.rest_between_exercises}s</h3>
                <button onClick={() => startExerciseRestTimer(exerciseIndex)}>
                  Iniciar descanso entre ejercicios
                </button>
                <span>
                  {exerciseRestTimers[exerciseIndex] ||
                    routine.rest_between_exercises}
                  s
                </span>
              </div>
            </div>
          ))}
        <button onClick={handleCompleteRoutine} className="finish-button">
          Rutina Terminada
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default AdvanceFbRoutine;
