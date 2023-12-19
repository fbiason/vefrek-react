import React from "react";
import "./pagina-empresa.css"; // Asegúrate de tener el archivo de estilos correspondiente

const PaginaEmpresa = () => {
  return (
    <section className="d-flex background">
      <div className="pagina-empresa-container container">
        {/* Columna 1 */}
        <div className="column-1 ">
          <div className="perfil-card">
            <div className="logo-container">
              {/* Aquí va el logo de la empresa */}
              <img src="ruta_del_logo.png" alt="Logo de la empresa" />
            </div>
            <div className="nombre-slogan-container">
              {/* Aquí va el nombre de la empresa */}
              <h1>Nombre de la Empresa</h1>
              {/* Aquí va el slogan de la empresa */}
              <p>Slogan de la Empresa</p>
            </div>
          </div>

          <div className="informacion-container">
            {/* Aquí va el loreipsum con el título "Información" */}
            <h2>Información</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="reseña-container">
            {/* Aquí va "Reseña, Calificacion, Comentarios" */}
            <h2>Reseña, Calificación, Comentarios</h2>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="column-2">
          <div className="ubicacion-container">
            {/* Aquí va el mapa de Google con la ubicación */}
            {/* Puedes usar un componente de mapa como Google Maps o Mapbox */}
          </div>
          <div className="telefono-container">
            {/* Aquí va el número de teléfono */}
            <p>Teléfono: +123456789</p>
          </div>
          <div className="redes-sociales-container">
            {/* Aquí van los iconos de las redes sociales */}
            {/* Puedes usar iconos de bibliotecas como Font Awesome */}
            <span>Redes Sociales: Facebook, Twitter, Instagram, etc.</span>
          </div>
          <div className="sitio-web-container">
            {/* Aquí va el sitio web de la empresa */}
            <p>Sitio Web: www.empresa.com</p>
          </div>
          <div className="horarios-container">
            {/* Aquí van los horarios de la empresa */}
            <p>Horarios: Lunes a Viernes: 9:00 AM - 6:00 PM</p>
          </div>
          <div className="reportar-negocio-container">
            {/* Aquí va el botón "Reportar Negocio" */}
            <button>Reportar Negocio</button>
          </div>
          <div className="contactar-propietario-container">
            {/* Aquí va el enlace "Contactar a propietario" */}
            <a href="#">Contactar a propietario</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaginaEmpresa;
