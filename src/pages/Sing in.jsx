import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Header from "../components/header";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify
import "./styles/singin.css";

function SingIn() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_name, setUserName] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [error, setError] = useState("");
    const [training_level, setTrainingLevel] = useState("");
    const [disc_or_dise, setDiscOrDise] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const sexOptions = ["Masculino", "Femenino"];
    const trainingLevelOptions = ["Principiante", "Intermedio", "Avanzado"];
    const discOrDiseOptions = [
        "Ninguna",
        "Enfermedad Cardiaca o Respiratoria",
        "Lesión leve en brazo/s",
        "Lesión leve en pierna/s"
    ];

    const navigate = useNavigate();

    const handlesubmint = async (e) => {
        e.preventDefault();

        if (!acceptTerms) {
            toast.error("Debes aceptar los términos y condiciones para continuar.");
            return;
        }

        try {
            const res = await axios.post(`${apiUrl}/api/users`, {
                name,
                last_name,
                user_name,
                age,
                sex,
                training_level,
                disc_or_dise,
                email,
                password,
                first_login: true // Se establece que es el primer inicio de sesión
            });

            console.log(res);
            e.target.reset();
            setAcceptTerms(false);
            toast.success("Registro exitoso!"); // Muestra notificación de éxito
            navigate("/"); // Redirige a la ruta raíz después del registro exitoso
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail); // Muestra el error del backend
                toast.error("Error al registrarse: " + error.response.data.detail); // Muestra el error como toast
            } else {
                setError("Error al registrarse");
                toast.error("Error al registrarse"); // Notificación genérica de error
            }
        }
    };

    return (
        <div className="main-containers">
            <Header />
            <div className="info-containers">
                <form onSubmit={handlesubmint} className="form-container">
                    <h2>Registro</h2>
                    <div className="form-partone">
                        <div className="data-person">
                            <input 
                                type="text" 
                                placeholder="Nombre"
                                onChange={(e) => setName(e.target.value)}     
                                required
                            /><br/>
                            <input 
                                type="text" 
                                placeholder="Apellido" 
                                onChange={(e) => setLastName(e.target.value)}    
                                required
                            /><br/>
                            <input 
                                type="text" 
                                placeholder="Nombre de Usuario"
                                onChange={(e) => setUserName(e.target.value)}     
                                required
                            /><br/>
                        </div>
                        <div className="data-health">
                            <input 
                                type="number" 
                                placeholder="Edad"
                                onChange={(e) => setAge(e.target.value)}     
                                required
                                className="age"
                            /><br/>

                            <label className="title-label">Sexo</label><br/>
                            <ul className="options-list">
                                {sexOptions.map(option => (
                                    <li 
                                        key={option}
                                        className={sex === option ? 'selected' : ''}
                                        onClick={() => setSex(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>

                            <label className="title-label">Nivel de entrenamiento</label><br/>
                            <ul className="options-list">
                                {trainingLevelOptions.map(option => (
                                    <li 
                                        key={option}
                                        className={training_level === option ? 'selected' : ''}
                                        onClick={() => setTrainingLevel(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>

                            <label className="title-label">Discapacidad o enfermedad</label><br/>
                            <ul className="options-list">
                                {discOrDiseOptions.map(option => (
                                    <li 
                                        key={option}
                                        className={disc_or_dise === option ? 'selected' : ''}
                                        onClick={() => setDiscOrDise(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="data-contact">
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}     
                            required
                        /><br/>
                        <input 
                            type="password"  
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}     
                            required
                        /><br/>
                    </div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={acceptTerms} 
                            onChange={(e) => setAcceptTerms(e.target.checked)} 
                            required 
                        />
                        Acepto los <a href="/terms-and-conditions" className="terms-link">términos y condiciones</a>
                    </label><br/>

                    <input type="submit" value="Registrar" className="submit-button"/>
                </form>
                <div>
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

export default SingIn;
