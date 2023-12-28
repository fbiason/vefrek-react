import React, { useState } from "react";
import "./pagina-empresa.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -53.788625,
  lng: -67.701736,
};

const options = {
  disableDefaultUI: true,
};

const PaginaEmpresa = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [imagenes, setImagenes] = useState([
    "/images/portfolio/ba (1).jpeg",
    "/images/portfolio/ba (2).jpeg",
    "/images/portfolio/ba (3).jpeg",
    "/images/portfolio/ba (4).jpeg",
    "/images/portfolio/ba (5).jpeg",
    "/images/portfolio/biasonautomotores.jpeg",
  ]);

  const intercambiarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    const temp = nuevasImagenes[0];
    nuevasImagenes[0] = nuevasImagenes[index];
    nuevasImagenes[index] = temp;
    setImagenes(nuevasImagenes);
  };

  return (
    <section className="d-flex background">
      <div className="pagina-empresa-container container">
        {/* Columna 1 */}
        <div className="column-1">
          <div className="perfil-card-element1 card-empresa ">
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

            <div className="grid gap-4 img-negocio">
              <div>
                <img
                  className={`h-72 w-128 cursor-pointer ${
                    imagenSeleccionada === 0 ? "imagen-seleccionada" : ""
                  }`}
                  src={imagenes[0]}
                  alt=""
                  onClick={() => {
                    setImagenSeleccionada(0);
                    intercambiarImagen(0);
                  }}
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <div key={index}>
                    <img
                      className={`h-72 w-128 cursor-pointer  ${
                        imagenSeleccionada === index + 1
                          ? "imagen-seleccionada"
                          : ""
                      }`}
                      src={imagenes[index + 1]}
                      alt=""
                      onClick={() => {
                        setImagenSeleccionada(index + 1);
                        intercambiarImagen(index + 1);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="perfil-card-element1 mt-3 card-empresa ">
            <div className="informacion-container">
              <h2>Información</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          <div className="perfil-card-element1 mt-3 card-empresa ">
            <div className="reseña-container">
              <h2>Reseña, Calificación, Comentarios</h2>
            </div>
            <div className="max-w-lg shadow-md mt-4">
              <form action="" className="w-full p-2">
                <div className="mb-2">
                  <label htmlFor="comment" className="text-gray-600 w-full">
                    Deja tu comentario sobre la empresa
                  </label>
                  <textarea
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment"
                    placeholder=""
                  ></textarea>
                </div>

                <div className="flex items-center mb-2">
                  <span className="text-gray-600">Valoración: </span>
                  ⭐⭐⭐⭐⭐
                </div>
                <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">
                  Comentar
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Fin Columna 1 */}

        {/* Columna 2 */}
        <div className="perfil-card-element2 card-empresa ">
          <div className="column-2 flex-grow-1">
            <div className="ubicacion-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9427.429538499919!2d-67.7075095!3d-53.7920258!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb6f95528b0ed55%3A0x52935c003ba20eef!2sBiason%20Automotores!5e0!3m2!1ses-419!2sar!4v1703777982199!5m2!1ses-419!2sar"
                className="google-map"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="telefono-container mt-5">
              <p>Direccion: Rivadavia 1.333, Rio Grande, Tierra del Fuego</p>
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

            <div className="sitio-web-container mt-3">
              <p>Sitio Web: www.biasonautomotores.com.ar</p>
            </div>
            <div>
              <button className="reportar">Reportar Negocio</button>
            </div>
          </div>
        </div>
        {/* Fin Columna 2 */}
      </div>
    </section>
  );
};

export default PaginaEmpresa;
