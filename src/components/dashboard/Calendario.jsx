import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarDash from "./NavBarDash";
import "./calendario.css";
import "tailwindcss/tailwind.css";

const Calendario = () => {
  const [activeNavItem, setActiveNavItem] = useState(3);
  const [fechaActual, setFechaActual] = useState("");
  const [diasDelMes, setDiasDelMes] = useState([]);
  const [mesesDelAnio, setMesesDelAnio] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Agregar estado para la fecha seleccionada
  const [comment, setComment] = useState(""); // Agregar estado para el comentario
  const [selectedCompany, setSelectedCompany] = useState("empresa1"); // Agregar estado para la empresa seleccionada
  const navigate = useNavigate();

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

    const generarMesesDelAnio = () => {
      const opcionesMeses = { month: "long" };
      const meses = [];
      for (let i = 0; i < 12; i++) {
        const fecha = new Date();
        fecha.setMonth(i);
        meses.push(fecha.toLocaleDateString("es-ES", opcionesMeses));
      }
      return meses;
    };

    setFechaActual(obtenerFechaActual());
    setDiasDelMes(generarDiasDelMes());
    setMesesDelAnio(generarMesesDelAnio());
  }, []);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date); // Al hacer clic en una fecha, establecerla como fecha seleccionada
    // Mostrar el popup de comentarios
  };

  const handleCancelClick = () => {
    setSelectedDate(null); // Cancelar, deseleccionar la fecha
    setComment(""); // Limpiar el comentario
    setSelectedCompany("empresa1"); // Restablecer la empresa seleccionada
  };

  const handleSubmitComment = () => {
    // Lógica para enviar el comentario
    console.log("Comentario:", comment);
    console.log("Empresa seleccionada:", selectedCompany);
    // Restablecer valores después de enviar el comentario
    setComment("");
    setSelectedCompany("empresa1");
    setSelectedDate(null);
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
      <NavBarDash />
      <button
        className="btn btn-primary dashboardClose"
        onClick={() => {
          const previousSaved = localStorage.getItem("previousPathToDash");
          previousSaved
            ? navigate(localStorage.getItem("previousPathToDash"))
            : navigate("/");
        }}
      >
        Salir
      </button>

      <section className="background-item row contenido-calendario g-4">
        <div className="contenido-info">
          <div>
            <h1 className="titulo-dash">Calendario</h1>
          </div>
          <p className="text-center mt-3 mb-5">
            Publica GRATIS las próximas fechas de promociones y descuentos que
            ofrecerá tu empresa.
          </p>
        </div>
        <div className={`container flex justify-around mb-4`}>
          {mesesDelAnio.map((mes, index) => (
            <div
              key={index}
              className={
                mes === fechaActual.split(" ")[1] ? "mes-calendario" : ""
              }
            >
              {mes}
            </div>
          ))}
        </div>

        <div className="calendario p-4 container grid grid-cols-7 gap-2">
          {diasDelMes.map((dia, index) => (
            <div
              key={index}
              className={`dia-calendario text-center cursor-pointer border p-4 rounded-lg ${
                dia === new Date().getDate() ? "highlighted" : ""
              }`}
              onClick={() => handleDateClick(dia)}
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Popup para dejar comentario */}
        {selectedDate !== null && (
          <div className="popup-container">
            <div className="popup mt-3">
              {" "}
              <h2>
                Ingrese la promoción para su empresa para el día {selectedDate}
              </h2>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ingrese la promoción (máximo 25 caracteres)..."
                rows={4}
                cols={50}
                className="mt-3"
                maxLength={25} // Añadir la propiedad maxLength
              />
              <div>
                <p>Seleccione su empresa</p>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="empresa1">Empresa 1</option>
                  <option value="empresa2">Empresa 2</option>
                </select>
              </div>
              <div className="btn-container mt-3">
                <button className="btn" onClick={handleCancelClick}>
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitComment}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Calendario;
