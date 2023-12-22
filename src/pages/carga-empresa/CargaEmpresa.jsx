import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "./carga-empresa.css";

const CargaEmpresa = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    slogan: "",
    ubicacion: "",
    telefono: "",
    telefono2: "",
    whatsapp: "",
    sitioWeb: "",
    mail: "",
    categoria: "",
    horarioApertura: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      x: "",
      linkedin: "",
      tiktok: "",
      youtube: "",
    },
    descripcion: "",
    logo: null,
    imagenPortada: null,
    otrasImagenes: [],
    horarioApertura: "09:00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="perfil-container">
      <div className="container card-carga">
        <div className="perfil-card container">
          <h2>Carga tu negocio:</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <label>Nombre de empresa:</label>
                <div>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="wide-input"
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label>Slogan:</label>{" "}
                <input
                  type="text"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleChange}
                  className="wide-input"
                />{" "}
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label>Ubicación:</label>{" "}
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="wide-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label> Teléfono: </label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="wide-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label className="full-width-label">
                  Teléfono alternativo (opcional):
                </label>
                <input
                  type="text"
                  name="telefono2"
                  value={formData.telefono2}
                  onChange={handleChange}
                  className="wide-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label>Sitio Web (opcional): </label>
                <input
                  type="text"
                  name="sitioWeb"
                  value={formData.sitioWeb}
                  onChange={handleChange}
                  className="wide-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <label>Categoría: </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="select-custom-width"
                >
                  <option value="" disabled hidden>
                    <span>Selecciona una categoría</span>
                  </option>
                  <option disabled style={{ color: "darkgray" }}>
                    - Reparación y Mantenimiento
                  </option>
                  <option value="gomerias">
                    -- Gomerías (arreglo y venta de cubiertas, alineación y
                    balanceo)
                  </option>
                  <option value="talleres">
                    -- Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                  </option>
                  <option value="repuestos">-- Repuestos (Autopartes)</option>
                  <option value="lubricentros">-- Lubricentros</option>
                  <option
                    disabled
                    style={{ color: "darkgray" }}
                    value="venta_alquiler"
                  >
                    - Venta y Alquiler de vehículos
                  </option>
                  <option value="agencia">
                    -- Agencia (Concesionaria oficiales y Agencias particulares)
                  </option>
                  <option value="rent_car">
                    -- Rent a Car (Alquiler de autos)
                  </option>
                  <option
                    disabled
                    style={{ color: "darkgray" }}
                    value="otros_servicios"
                  >
                    - Otros Servicios
                  </option>
                  <option value="aseguradoras">-- Aseguradoras</option>
                  <option value="estaciones_servicio">
                    -- Estaciones de Servicios
                  </option>
                  <option value="estetica_automotor">
                    -- Estética del Automotor (Lavaderos, Polarizados)
                  </option>
                  <option value="servicios_emergencia">
                    -- Servicios de emergencia (Grúas, Cerrajeros)
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container card-carga">
        <div className="card-descripcion ">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <a>Descripción (hasta 300 caracteres): </a>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  maxLength="300"
                  className="descripcion"
                />{" "}
              </div>
            </div>
          </form>
        </div>

        <div className="perfil-card mt-3">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-whatsapp me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="WhatsApp"
                  />
                </div>

                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-facebook me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Facebook"
                  />
                </div>

                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-instagram me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Instagram"
                  />
                </div>

                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-tiktok me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.tiktok"
                    value={formData.socialMedia.tiktok}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="TikTok"
                  />
                </div>
              </div>

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-linkedin me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.linkedin"
                    value={formData.socialMedia.linkedin}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="LinkedIn"
                  />
                </div>

                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-x me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.x"
                    value={formData.socialMedia.x}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="X"
                  />
                </div>

                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fab fa-youtube me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.youtube"
                    value={formData.socialMedia.youtube}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Youtube"
                  />
                </div>

                <div className="form-col red-whith d-flex align-items-center">
                  <label>
                    <i className="fas fa-envelope me-2"></i>
                  </label>
                  <input
                    type="text"
                    name="socialMedia.mail"
                    value={formData.socialMedia.mail}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Mail"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="perfil-card mt-3">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <label className="img-form">Logo de la empresa (82x82): </label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <label className="img-form">
                  Cargar imágenes (límite hasta 6):{" "}
                </label>
                <input
                  type="file"
                  name="otrasImagenes"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      </div>

      <div className="container card-carga">
        <div className="perfil-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <label>Horario de apertura: </label>
                <TimePicker
                  name="horarioApertura"
                  onChange={(value) => handleChange("horarioApertura", value)}
                  value={formData.horarioApertura}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CargaEmpresa;
