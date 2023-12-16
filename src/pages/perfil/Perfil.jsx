import React, { useState } from "react";
import "./perfil.css";

const Perfil = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    contrasena: "",
    confirmacion: "",
    correo: "",
    provincia: "",
    localidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="text"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
            />
          </label>
          <label>
            Confirmar Contraseña:
            <input
              type="text"
              name="confirmacion"
              value={formData.confirmacion}
              onChange={handleChange}
            />
          </label>
          <label>
            Provincia:
            <input
              type="text"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
            />
          </label>
          <label>
            Localidad:
            <input
              type="text"
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
