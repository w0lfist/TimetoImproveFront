import React, { useState, useEffect } from "react";  // Asegúrate de importar useState y useEffect
import { Navigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/taskList";
import Header from "../components/header";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/dashboard.css";
import "./styles/modals.css";
import adviceList from "../components/lists";
import CreateTag from "../components/create tag";

function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentAdvice, setCurrentAdvice] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showCreateTag, setShowCreateTag] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const userId = localStorage.getItem("user_id");
    try {
      const res = await axios.get(`${apiUrl}/api/tags/user/${userId}`);
      setTasks(res.data.map(task => ({ ...task, id: task._id })));
    } catch (error) {
      console.error("Error al obtener las tarjetas:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Oculta el texto antes de cambiarlo
      setTimeout(() => {
        setCurrentAdvice((prevAdvice) => (prevAdvice + 1) % adviceList.length);
        setIsVisible(true); // Muestra el nuevo mensaje
      }, 1000); // Espera para cambiar el mensaje
    }, 15000); // 15 segundos para cada mensaje

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const resetTasks = async () => {
    const userId = localStorage.getItem("user_id");
    try {
        await axios.put(`${apiUrl}/api/tags/reset/user/${userId}`);
        fetchTasks();
        toast.success("¡Estados de las tarjetas reiniciados con éxito!"); // Mensaje de éxito
    } catch (error) {
        toast.error("Error al reiniciar las tarjetas:", error);
    }
};

  const eliminateTasks = async () => {
    const userId = localStorage.getItem("user_id");
    try {
      await axios.delete(`${apiUrl}/api/tags/eliminate/user/${userId}`);
      // Refresca la página después de eliminar las tarjetas
      window.location.reload(); // Recarga la página
    } catch (error) {
      toast.error("Error al eliminar las tarjetas:", error);
    }
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="main-container">
        <Header />
        <div className="sub-header">
          <div className="container-slider">
            <div className={`advice-item ${isVisible ? 'fade-in' : 'fade-out'}`}>
              {adviceList[currentAdvice]}
            </div>
          </div>
        </div>
        <div className="info-container">
          <h1>Hola {capitalizeFirstLetter(userName)}!</h1>
          <p className="introduction-dashboard">Este es tu Dashboard, aquí podrás ver tus rutinas y los días que seleccionaste para entrenar...</p>
          <p className="introduction-dashboardt ">Cada vez que acabe una semana reinicia los estados de las tarjetas para que estes consciente si trabajaste o no esta semana</p>
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
          <button onClick={resetTasks} className="reset-button">Reiniciar Estados</button>
          
          <div className="create-eliminate">
            <button onClick={() => setShowCreateTag(true)} className="create-button">Crear una tarjeta</button>
            <button onClick={eliminateTasks} className="eliminate-button">Eliminar Las tarjetas</button>
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

        <Footer />

        {showCreateTag && (
          <div className="modal-overlay">
            <div className="modal-content">
              <CreateTag fetchTasks={fetchTasks} setShowCreateTag={setShowCreateTag} />
              <button onClick={() => setShowCreateTag(false)} className="close-button">Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
