import React from 'react';
import "./styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="info-footer">
        
        <div>
          <h3>Nosotros</h3>
          <p className='tti-email'>Email: <a href="mailto:tti.app.co@gmail.com" className='links'>tti.app.co@gmail.com</a></p>
          <p className='terms-conditions'><a href="/terminos-y-condiciones" className='links'>Términos y Condiciones</a></p>
        </div>
        
        <div>
          <h3>¿Te Gusta Time to Improve?</h3>
          <p className='donation-text'>Haz una donación y contribuye al desarrollo de esta aplicación.</p>
          <p className='tti-paypal'><a href="https://paypal.me/ttidonations" target="_blank" rel="noopener noreferrer" className='links'>
            <img src="/multimedia/icons/paypal-icon.png" alt="PayPal" className="social-icon" /> Donar a Time to Improve
          </a></p>
        </div>
        
        <div>
          <h3>Social</h3>
          <p className='tti-instagram'><a href="https://www.instagram.com/ttiapp_co/" target="_blank" rel="noopener noreferrer" className='links'>
            <img src="/multimedia/icons/instagram-icon.png" alt="Instagram" className="social-icon" /> @ttiapp_co
          </a></p>
          <p className='tti-blog'><a href="https://tti-app.blogspot.com/" target="_blank" rel="noopener noreferrer" className='links'>
            <img src="/multimedia/icons/blogger-icon.png" alt="Blogger" className="social-icon" /> Time to Improve Blog
          </a></p>
        </div>

      </div>
      
      <p>&copy; 2024 Time to Improve. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
