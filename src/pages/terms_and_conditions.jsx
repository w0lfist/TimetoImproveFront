import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function Terms() {

    return (
<div className="main-container">
      <Header />

      <div className="info-container">
        {/* Aquí puedes poner tu información */}
        <div>
            <h1>Terms and Conditions</h1>
            <h1>Términos y Condiciones</h1>
    <p><strong>Fecha de vigencia:</strong> [Fecha de la última actualización]</p>

    <p>Bienvenido a <strong>Time to Improve</strong>. Antes de comenzar a usar nuestra aplicación, por favor lee atentamente los siguientes términos y condiciones, ya que regulan el uso de los servicios ofrecidos en nuestra plataforma. Al usar <strong>Time to Improve</strong>, aceptas cumplir con estos términos.</p>

    <h2>1. Información General</h2>
    <ul>
        <li><strong>Nombre de la aplicación:</strong> Time to Improve</li>
        <li><strong>Propietario:</strong> [Nombre de la empresa o del propietario legal]</li>
        <li><strong>País de operación:</strong> Colombia, con disponibilidad global</li>
        <li><strong>Idioma del servicio:</strong> Español (por ahora)</li>
    </ul>

    <h2>2. Uso del Servicio</h2>
    <ul>
        <li><strong>Edad mínima:</strong> Los usuarios deben tener al menos 8 años para usar la aplicación. Si eres menor de 18 años, debes contar con el consentimiento de tus padres o tutores legales para usar los servicios.</li>
        <li><strong>Condiciones de uso:</strong> El usuario se compromete a proporcionar información real y precisa al registrarse en la aplicación, y a cumplir con las normas establecidas en estos términos.</li>
        <li><strong>Prohibiciones:</strong> El usuario no debe hackear, acceder de manera no autorizada ni divulgar información privada de otros usuarios.</li>
    </ul>

    <h2>3. Responsabilidad del Usuario</h2>
    <ul>
        <li><strong>Información precisa:</strong> Los usuarios deben proporcionar información verídica y actualizada al crear una cuenta y utilizar el servicio.</li>
        <li><strong>Cumplimiento de las normas:</strong> El incumplimiento de estas normas puede resultar en la suspensión o eliminación de la cuenta del usuario.</li>
    </ul>

    <h2>4. Limitación de Responsabilidad</h2>
    <ul>
        <li><strong>Lesiones:</strong> Las rutinas y métodos de entrenamiento ofrecidos por <strong>Time to Improve</strong> no producen lesiones si se siguen correctamente. La aplicación no es responsable de lesiones causadas por la mala ejecución de los ejercicios.</li>
        <li><strong>Pérdida de datos:</strong> <strong>Time to Improve</strong> no es responsable de la pérdida de datos, excepto en el caso de pérdidas ocasionadas por actividades durante actualizaciones o mantenimientos.</li>
    </ul>

    <h2>5. Propiedad Intelectual</h2>
    <p>Todos los logos, imágenes, y contenidos representativos de la aplicación son propiedad de <strong>Time to Improve</strong> y están protegidos por derechos de autor. Cualquier uso no autorizado de estos recursos está prohibido.</p>

    <h2>6. Modificaciones de los Términos</h2>
    <ul>
        <li>Los términos y condiciones pueden ser modificados en cualquier momento para reflejar nuevas funcionalidades o cambios en el servicio. Los usuarios serán notificados de cualquier cambio importante.</li>
        <li>El uso continuado de la aplicación después de la modificación de los términos constituirá la aceptación de los nuevos términos.</li>
    </ul>

    <h2>7. Soporte y Contacto</h2>
    <p>Para cualquier duda, queja o reclamación, puedes contactarnos a través del correo electrónico: [tu correo de soporte]. Pronto ofreceremos una sección de preguntas frecuentes y un apartado para quejas y reclamaciones.</p>

    <h2>8. Resolución de Controversias</h2>
    <ul>
        <li>En caso de controversias, primero se intentará llegar a un acuerdo a través del canal de soporte. Si no se llega a una solución, el conflicto será llevado a arbitraje o tribunal competente en Colombia.</li>
        <li>Los usuarios renuncian a presentar demandas colectivas y se comprometen a resolver los conflictos de manera individual.</li>
    </ul>
        </div>
      </div>

      <div className="sidebar-left"></div>
      <div className="sidebar-right"></div>

      <Footer />
    </div>
    );

}

export default Terms;
