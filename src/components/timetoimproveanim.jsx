import React, { useState, useEffect } from "react";
import './styles/Reloj.css';  // El archivo de estilos
import reloj from "/multimedia/animations/reloj.svg";
import manecilla from "/multimedia/animations/manecilla.svg";

const RelojAnimado = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    };

    // Pre-carga de ambas imágenes
    Promise.all([preloadImage(reloj), preloadImage(manecilla)]).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  return (
    <div className="reloj-container">
      {imagesLoaded ? (
        <>
          <img src={reloj} alt="Reloj" className="reloj-fijo" />
          <img src={manecilla} alt="Manecilla" className="manecilla" />
        </>
      ) : (
        <div>Cargando reloj...</div> // Texto o animación temporal de carga
      )}
    </div>
  );
};

export default RelojAnimado;
