import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/accountsetings.css"


const AccountSettings = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [activeSection, setActiveSection] = useState('usuario');
    const [userData, setUserData] = useState({
        name: '',
        last_name: '',
        user_name: '',
        age: '',
        training_level: '',
        disc_or_dise: '',
        sex: '',
    });
    const [fetchedUserData, setFetchedUserData] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        if (!token) {
            navigate('/'); // Redirige a login si no hay token
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFetchedUserData(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const updateUserData = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        try {
            await axios.put(`${apiUrl}/api/users/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Datos actualizados correctamente.');
            const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFetchedUserData(response.data);
            setUserData(response.data);
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            toast.error('Hubo un problema al actualizar los datos.');
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault(); // Evita el envío del formulario por defecto
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        const currentPassword = prompt("Por favor ingresa tu contraseña actual:");

        try {
            await axios.put(`${apiUrl}/api/users/${userId}/password`, {
                current_password: currentPassword,
                new_password: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Contraseña actualizada correctamente.');
            setNewPassword('');
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            toast.error('Hubo un problema al actualizar la contraseña.');
        }
    };

    const handleReassignRoutine = async () => {
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

  const handleDeleteUser = async () => {
    const currentPassword = prompt("Por favor ingresa tu contraseña actual para eliminar tu cuenta:");

    if (currentPassword) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        try {
            await axios.delete(`${apiUrl}/api/delete/user/${userId}`, {
                data: { current_password: currentPassword },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Usuario eliminado exitosamente.');
            localStorage.clear(); // Limpia los datos del usuario en el localStorage
            navigate('/'); // Redirige al login
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            toast.error('Hubo un problema al eliminar el usuario.');
        }
    }
};

    return (
        <div className='main-container'>
            <Header />
            <div className="account-settings-container">
                {message && <div className="message">{message}</div>} {/* Mostrar mensaje */}
                <div className="section-toggle">
                    <button
                        onClick={() => setActiveSection('usuario')}
                        className={activeSection === 'usuario' ? 'active' : ''}
                    >
                        Usuario
                    </button>
                    <button
                        onClick={() => setActiveSection('salud')}
                        className={activeSection === 'salud' ? 'active' : ''}
                    >
                        Salud
                    </button>
                </div>

                {activeSection === 'usuario' && (
                    <div className="section-content">
                        
                        <p>Nombre: {fetchedUserData.name}</p>
                        <input
                            type="text"
                            name="name"
                            placeholder="Actualizar nombre"
                            onChange={handleInputChange}
                        />
                        <p>Apellido: {fetchedUserData.last_name}</p>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Actualizar apellido"
                            onChange={handleInputChange}
                        />
                        <p>Nombre de usuario: {fetchedUserData.user_name}</p>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Actualizar nombre de usuario"
                            onChange={handleInputChange}
                        />
                        <p>Correo electrónico: {fetchedUserData.email}</p>
                        <form onSubmit={handlePasswordUpdate} className="password-update-form">
                    <h3>Actualizar Contraseña</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nueva contraseña"
                    />
                    <button type="submit" className="update-password-button">Actualizar Contraseña</button>
                </form>
                    </div>
                )}

                {activeSection === 'salud' && (
                    <div className="section-content">
                        <p>Si cambias alguno de estos datos deberas darle al boton de reasignar rutina para 
                            asegurarte que tengas una rutina acorde a tus capacidades, ademas de eliminar tus tarjetas y hacerlas denuevo con la nueva rutina</p>
                        <br/>
                        <p>Edad: {fetchedUserData.age}</p>
                        <input
                            type="number"
                            name="age"
                            placeholder="Actualizar edad"
                            onChange={handleInputChange}
                        />
                        <p>Nivel de entrenamiento: {fetchedUserData.training_level}</p>
                        <select
                            name="training_level"
                            value={userData.training_level}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione nivel</option>
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </select>
                        <p>Discapacidad o enfermedad: {fetchedUserData.disc_or_dise}</p>
                        <select
                            name="disc_or_dise"
                            value={userData.disc_or_dise}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione</option>
                            <option value="Ninguna">Ninguna</option>
                            <option value="Enfermedad Cardiaca o Respiratoria">Enfermedad Cardiaca o Respiratoria</option>
                            <option value="Lesion leve en brazo/s">Lesion leve en brazo/s</option>
                            <option value="Lesion leve en pierna/s">Lesion leve en pierna/s</option>
                        </select>
                        <p>Género: {fetchedUserData.sex}</p>
                        <select
                            name="sex"
                            value={userData.sex}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                )}
                
                <div className="buttons-container">
                    <button onClick={updateUserData} className="update-button">Actualizar Datos</button>
                    <button onClick={handleReassignRoutine} className="reassign-button">Reasignar Rutina</button>
                    <button onClick={handleDeleteUser} className="deleteuser-button">Eliminar Usuario</button>
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
};

export default AccountSettings;