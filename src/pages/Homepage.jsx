import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Header from "../components/header";
import Footer from "../components/footer";
import RelojAnimado from "../components/timetoimproveanim";
import "./styles/Homepage.css"



function Homepage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Verifica si existe un token al montar el componente
    useEffect(() => {
        const token = localStorage.getItem("token"); // O el método que uses para almacenar el token
        setIsAuthenticated(!!token);
    }, []);

    return (
        <div className="main-container">
            <Header />
            <div className="subheader">
                <div className="container-logo">
                    {/* Aquí puedes incluir cualquier logotipo o contenido adicional */}
                </div>
                <div className="container-img">
                    <img 
                        src="/multimedia/images/presentaciones/welcome.png" 
                        alt="IMAGEN DE BIENVENIDA" 
                        className="welcome-img"
                    />
                </div>
                {/* Solo muestra el formulario de login si el usuario no está autenticado */}
                {!isAuthenticated && <Login />}
            </div>
            <div className="info-container">
                <div className="container">
                    <div className="introduction">
                        <p>
                            <strong>Time to Improve</strong> es una aplicación diseñada para todos aquellos interesados en el mundo del fitness, sin importar su nivel de experiencia. Ya seas un principiante que está empezando su viaje o un atleta avanzado buscando mejorar su rendimiento, incluso si tienes alguna incapacidad o condición médica, Time to Improve se adapta a ti.
                        </p>
                    </div>
                    <div className="presentation-tti">
                        <div className="presentation-textcontainer">
                            <h2>¿Qué ofrece Time to Improve?</h2>
                            <p><strong>Rutinas personalizadas:</strong> Nuestra aplicación genera rutinas adaptadas a tu nivel actual de entrenamiento, asegurando que tu progreso sea constante y eficaz.</p>
                            <p><strong>Asignación automática de rutinas:</strong> No más complicaciones. Time to Improve selecciona automáticamente la rutina que mejor se ajusta a tus necesidades y objetivos.</p>
                            <p><strong>Rutinas autoadaptables:</strong> A medida que avanzas, nuestras rutinas se adaptan automáticamente para seguir desafiándote y ayudándote a mejorar.</p>
                            <p><strong>Organización eficiente:</strong> Nuestro sistema de entrenamiento basado en tarjetas te permite organizar tus rutinas de manera clara y sencilla, haciendo que tu experiencia sea lo más cómoda posible.</p>
                            <p><strong>Interfaz atractiva y cómoda:</strong> Hemos diseñado una interfaz moderna, intuitiva y fácil de usar, para que te concentres en lo importante: tu entrenamiento.</p>
                        </div>
                        <div className="presentation-imgscontainer">
                            <div className="image-interface">
                                <img src="/multimedia/images/presentaciones/time to improve interface.jpg" alt="DASHBOARD" className="dashboard-img"/>
                            </div>
                            <div className="image-rutineassign">
                                <img src="/multimedia/images/presentaciones/create tags.jpg" alt="INTERFAZ DE CREACION DE TARJETAS" className="createtags-img"/>
                            </div>
                        </div>
                    </div>
                    <div className="ourhistory-container">
                        <h2>Nuestra historia</h2>
                        <div className="our-history">
                            <div className="clock-father">
                                <div className="clock-container"><RelojAnimado/></div>
                            </div>
                            <div className="ourhistory-text">
                                <p>
                                    <strong>Time to Improve</strong> nació como una idea aleatoria para un proyecto escolar, pero poco a poco fue tomando forma hasta convertirse en una realidad. Desde junio de este año, hemos trabajado arduamente para crear una herramienta que no solo sea útil, sino también impactante en la comunidad fitness. Lo que comenzó como un simple concepto, hoy es una aplicación completa y esperamos que sea una parte esencial de la vida de quienes buscan mejorar su condición física.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="comunity">
                        <h2>¡Únete a la comunidad!</h2>
                        <p>
                            Independientemente de tu nivel, capacidad o experiencia, <strong>Time to Improve</strong> está aquí para guiarte en tu camino hacia una mejor versión de ti mismo. ¡Es momento de mejorar, es tiempo de <strong>Time to Improve</strong>!
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Homepage;