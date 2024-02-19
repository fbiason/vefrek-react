import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./calendario.css";
import NavBarDash from "./NavBarDash";

const Calendario = () => {
  const [activeNavItem, setActiveNavItem] = useState(3);
  const [isFlipped, setFlipped] = useState(false);
  const [fechaActual, setFechaActual] = useState("");
  const [diasDelMes, setDiasDelMes] = useState([]);

  useEffect(() => {
    const obtenerFechaActual = () => {
      const opcionesFecha = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const fecha = new Date();
      return fecha.toLocaleDateString("es-ES", opcionesFecha);
    };

    const generarDiasDelMes = () => {
      const fecha = new Date();
      const primerDiaDelMes = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        1
      );
      const ultimoDiaDelMes = new Date(
        fecha.getFullYear(),
        fecha.getMonth() + 1,
        0
      );

      const dias = [];
      for (
        let i = primerDiaDelMes.getDate();
        i <= ultimoDiaDelMes.getDate();
        i++
      ) {
        dias.push(i);
      }

      return dias;
    };

    setFechaActual(obtenerFechaActual());
    setDiasDelMes(generarDiasDelMes());
  }, []);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleDateClick = () => {
    setFlipped(!isFlipped);
  };

  const handleCancelClick = () => {
    setFlipped(false);
  };

  const menuItems = [
    { icon: "fa-house", text: "Inicio", to: "/Dashboard" },
    { icon: "fa-user", text: "Perfil", to: "/Perfil" },
    { icon: "fa-chart-bar", text: "Informe", to: "/Informe" },
    { icon: "fa-calendar", text: "Calendario", to: "/Calendario" },
    { icon: "fa-star", text: "Favoritos", to: "/Favoritos" },
    { icon: "fa-building", text: "Negocios", to: "/NegociosDash" },
    { icon: "fa-user-tie", text: "Administrador", to: "/Admin" },
  ];

  return (
    <main className="dashboardMain">
      <NavBarDash></NavBarDash>

      <section className="row contenido-calendario g-4">
        <div>
          <div>
            <h1>Calendario</h1>
          </div>
          <p className="text-center mt-3 mb-5">
            Publica GRATIS las próximas fechas de promociones y descuentos que
            ofrecerá tu empresa.
          </p>
        </div>
        <div className="container-cal">
          <div className={`calendario ${isFlipped ? "flip" : ""}`}>
            <div className="front">
              <div className="fecha" onClick={handleDateClick}>
                <div className="fecha-actual p-4">
                  <h1>{fechaActual}</h1>
                </div>
              </div>

              <div className="mes">
                <ul className="dias-semana">
                  <li>Lun</li>
                  <li>Mar</li>
                  <li>Mie</li>
                  <li>Jue</li>
                  <li>Vier</li>
                  <li>Sab</li>
                  <li>Dom</li>
                </ul>

                <div className="weeks">
                  {diasDelMes.map((dia, index) => (
                    <span key={index} className={dia === 15 ? "active" : ""}>
                      {dia < 10 ? "0" + dia : dia}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="back">
              <input
                type="text"
                placeholder="Indique la promoción que desea realizar"
              />
              <div className="info">
                <div className="date">
                  <p className="info-date">Subir Promoción:</p>
                  <p className="info-time">Duración:</p>
                </div>
                <div className="address">
                  <p>Empresa:</p>
                </div>
                <div className="observations">
                  <p>Descripción: </p>
                </div>
              </div>

              <div className="actions">
                <button className="btn btn-primary save">
                  Guardar <i className="ion-checkmark"></i>
                </button>
                <button
                  className="btn btn-danger dismiss"
                  onClick={handleCancelClick}
                >
                  Cancelar <i className="ion-android-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Calendario;
