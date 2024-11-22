import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa axios para las solicitudes HTTP
import "./styles/tasklist.css"
import beginnerImage from '/multimedia/images/routines/beginner/beginner.jpg';
import intermediateImage from '/multimedia/images/routines/intermediate/intermediate.jpg';
import advancedImage from '/multimedia/images/routines/advance/advanced.jpg';

function TaskList({ tasks, fetchTasks }) {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const imageRoutineList = {
        "cuerpo completo principiante": beginnerImage,
        "cuerpo completo intermedio": intermediateImage,
        "cuerpo completo avanzado": advancedImage
    };

    const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    const sortedTasks = [...tasks].sort((a, b) => {
        return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
    });

    const getRedirectionRoute = (task) => {
        let ruta = "";
        if (task.routine.includes("Avanzado")) {
            ruta = `/routines/fullbody/advance/${task.routine}`;
        } else if (task.routine.includes("Intermedio")) {
            ruta = `/routines/fullbody/intermediate/${task.routine}`;
        } else if (task.routine.includes("Principiante")) {
            ruta = `/routines/fullbody/beginner/${task.routine}`;
        } else {
            console.log("Nivel de rutina no reconocido");
        }
        return ruta;
    };

    const getStateClass = (state) => {
        if (state === "Sin iniciar") return "red";
        if (state === "Incompleta") return "blue";
        if (state === "Completada") return "green";
        return "";
    };

    const handleStartClick = async (task) => {
        if (!task.day) {
            console.error("El día de la tarea no está definido.");
            return;
        }

        if (!task.id) {
            console.error("El ID de la tarea no está definido.");
            return;
        }

        localStorage.setItem("current_task_id", task.id);

        try {
            await axios.put(`${apiUrl}/api/tag/user/${task.id}`, {
                state: "Incompleta",
            });
            console.log(`Estado de la tarea "${task.day}" actualizado a "Incompleta"`);

            navigate(getRedirectionRoute(task));
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error.response?.data || error.message);
        }
    };

    const handleDeleteClick = async (taskId) => {
        try {
            await axios.delete(`${apiUrl}/api/delete/tag/user/${taskId}`);
            console.log(`Tarjeta con ID ${taskId} eliminada`);
            await fetchTasks();  // Llama a fetchTasks para refrescar la lista
        } catch (error) {
            console.error("Error al eliminar la tarjeta:", error.response?.data || error.message);
        }
    };

    const getRoutineImage = (task) => {
        if (!task.routine) return null;
    
        const lowerCaseName = task.routine.toLowerCase();
    
        if (lowerCaseName.includes("cuerpo completo") && lowerCaseName.includes("principiante")) {
            return imageRoutineList["cuerpo completo principiante"];
        } else if (lowerCaseName.includes("cuerpo completo") && lowerCaseName.includes("intermedio")) {
            return imageRoutineList["cuerpo completo intermedio"];
        } else if (lowerCaseName.includes("cuerpo completo") && lowerCaseName.includes("avanzado")) {
            return imageRoutineList["cuerpo completo avanzado"];
        }
    
        return null;
    };

    return (
        <div className="task-list">
            {sortedTasks.length === 0 ? (
                <p className="no-tasks">No tienes ninguna tarjeta, crea tus tarjetas para organizar mejor tu entrenamiento.</p>
            ) : (
                sortedTasks.map((task, index) => {
                    const stateClass = getStateClass(task.state);

                    return (
                        <div key={task.id || index} className={`task-card ${stateClass}`}>
                            <h2>{task.day}</h2>
                            <div className="routine-name">{task.routine}</div>
                            <div className="image">
                                <img 
                                    src={getRoutineImage(task)} 
                                    alt={task.routine}  
                                    className="task-image"
                                />
                            </div>
                            <div className="state">{task.state}</div>
                            
                            {/* Botón para iniciar la rutina */}
                            <button
                                className="start-button"
                                onClick={() => handleStartClick(task)}
                            >
                                Empezar
                            </button>

                            {/* Botón para eliminar la tarjeta con icono de "X" */}
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteClick(task.id)}
                            >
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default TaskList;