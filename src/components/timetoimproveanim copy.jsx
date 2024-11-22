import React, { useState, useEffect } from "react";
import './styles/Reloj.css';  // El archivo de estilos
import reloj from "/multimedia/animations/reloj.svg";
import manecilla from "/multimedia/animations/manecilla.svg";

const RelojAnimado2 = () => {
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
    <div className="reloj-container2">
      {imagesLoaded ? (
        <>
          <img src={reloj} alt="Reloj" className="reloj-fijo2" />
          <img src={manecilla} alt="Manecilla" className="manecilla2" />
        </>
      ) : (
        <div>Cargando reloj...</div> // Texto o animación temporal de carga
      )}
    </div>
  );
};

export default RelojAnimado2;
