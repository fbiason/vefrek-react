import React, { useState } from "react";
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
      twitter: "",
      linkedin: "",
      tiktok: "",
      youtube: "",
    },
    descripcion: "",
    logo: null,
    imagenPortada: null,
    otrasImagenes: [],
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
      <div className="perfil-card">
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
              <label>Teléfono alternativo (opcional):</label>
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
        </form>
      </div>
      <div className="perfil-card">
        {" "}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label>Whatsapp:</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Facebook: </label>
              <input
                type="text"
                name="socialMedia.facebook"
                value={formData.socialMedia.facebook}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Instagram: </label>
              <input
                type="text"
                name="socialMedia.instagram"
                value={formData.socialMedia.instagram}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Twitter: </label>
              <input
                type="text"
                name="socialMedia.twitter"
                value={formData.socialMedia.twitter}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Linkedin: </label>
              <input
                type="text"
                name="socialMedia.linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Tik Tok: </label>
              <input
                type="text"
                name="socialMedia.tiktok"
                value={formData.socialMedia.tiktok}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Youtube: </label>
              <input
                type="text"
                name="socialMedia.youtube"
                value={formData.socialMedia.youtube}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Mail: </label>
              <input
                type="text"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="perfil-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label>Categoría: </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                <option value="reparacion">Reparación y Mantenimiento</option>
                <option value="gomerias">
                  Gomerías (arreglo y venta de cubiertas, alineación y balanceo)
                </option>
                <option value="talleres">
                  Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                </option>
                <option value="repuestos">Repuestos (Autopartes)</option>
                <option value="lubricentros">Lubricentros</option>
                <option value="venta_alquiler">
                  Venta y Alquiler de vehículos
                </option>
                <option value="agencia">
                  Agencia (Concesionaria oficiales y Agencias particulares)
                </option>
                <option value="rent_car">Rent a Car (Alquiler de autos)</option>
                <option value="otros_servicios">Otros Servicios</option>
                <option value="aseguradoras">Aseguradoras</option>
                <option value="estaciones_servicio">
                  Estaciones de Servicios
                </option>
                <option value="estetica_automotor">
                  Estética del Automotor (Lavaderos, Polarizados)
                </option>
                <option value="servicios_emergencia">
                  Servicios de emergencia (Grúas, Cerrajeros)
                </option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Horario de apertura: </label>
              <input
                type="text"
                name="horarioApertura"
                value={formData.horarioApertura}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Descripción (hasta 300 caracteres): </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                maxLength="300"
                className="wide-input"
              />{" "}
            </div>
          </div>
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
              <label className="img-form">Imagen de portada (360x200):</label>
              <input
                type="file"
                name="imagenPortada"
                accept="image/*"
                onChange={handleFileChange}
              />{" "}
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="img-form">
                Otras imágenes (límite hasta 6):{" "}
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
  );
};

export default CargaEmpresa;
