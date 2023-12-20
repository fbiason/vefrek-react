import React from "react";
import "./pagina-empresa.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px", // Ajusta la altura según tus necesidades
};

const center = {
  lat: -53.788625,
  lng: -67.701736,
};

const options = {
  disableDefaultUI: true, // Puedes personalizar esto según tus necesidades
};

const PaginaEmpresa = () => {
  const imagenesCarrusel = [
    "/images/portfolio/biasonautomotores.jpeg",
    "/images/portfolio/biasonautomotores.jpeg",
    "/images/portfolio/biasonautomotores.jpeg",
    "/images/portfolio/biasonautomotores.jpeg",
    "/images/portfolio/biasonautomotores.jpeg",
    "/images/portfolio/biasonautomotores.jpeg",
  ];

  const carruselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  function CustomPrevArrow(props) {
    return <div className="custom-arrow custom-prev-arrow" {...props} />;
  }

  function CustomNextArrow(props) {
    return <div className="custom-arrow custom-next-arrow" {...props} />;
  }

  return (
    <section className="d-flex background">
      <div className="pagina-empresa-container container">
        {/* Columna 1 */}
        <div className="column-1">
          <div className="perfil-card-element1">
            <div className="logo-nombre-container">
              <div className="logo-container">
                <img
                  src="/images/logo-ba.png"
                  alt="Logo de la empresa"
                  className="logo-empresa"
                />
              </div>
              <div className="nombre-slogan-container">
                <h2>BIASON AUTOMOTORES</h2>
                <p>Tu lugar de confianza</p>
              </div>
            </div>

            <Slider {...carruselSettings}>
              {imagenesCarrusel.map((imagen, index) => (
                <div key={index} className="carrusel-item">
                  <img src={imagen} alt={`Imagen ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="perfil-card-element1 mt-3">
            <div className="informacion-container">
              <h2>Información</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          <div className="perfil-card-element1 mt-3">
            <div className="reseña-container">
              <h2>Reseña, Calificación, Comentarios</h2>
            </div>
          </div>
        </div>
        {/* Fin Columna 1 */}

        {/* Columna 2 */}
        <div className="perfil-card-element2">
          <div className="column-2">
            <div className="ubicacion-container">
              <LoadScript googleMapsApiKey="TU_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15} // Puedes ajustar el nivel de zoom según tus necesidades
                  options={options}
                />
              </LoadScript>
            </div>

            <div className="telefono-container">
              <p>Teléfono: +54 2966449951</p>
            </div>

            <div className="redes-sociales-container">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-x"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="enlace_a_instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>

            <div className="sitio-web-container">
              <p>Sitio Web: www.biasonautomotores.com.ar</p>
            </div>
            <div className="horarios-container">
              <p>Horarios: Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="reportar">
              <button>Reportar Negocio</button>
            </div>
          </div>
        </div>
        {/* Fin Columna 2 */}
      </div>
    </section>
  );
};

export default PaginaEmpresa;
