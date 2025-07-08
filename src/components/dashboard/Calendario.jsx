import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBarDash from "./NavBarDash";
import "tailwindcss/tailwind.css";
import { UserContext } from "../../context/userContext";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { SpinnerContext } from "../../context/spinnerContext";
import { savePromotion } from "../../utils/apiDb/apiDbAcions"; 
import "../../styles/dashboard/dashboard.css";

const Calendario = () => {
  const [activeNavItem, setActiveNavItem] = useState(3);
  const [fechaActual, setFechaActual] = useState("");
  const [diasDelMes, setDiasDelMes] = useState([]);
  const [mesesDelAnio, setMesesDelAnio] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [companysData, setCompanysData] = useState([]);
  const { userData } = useContext(UserContext);
  const { showSpinner } = useContext(SpinnerContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];
    if (selected < currentDate) {
      alert("¡Fecha no disponible! Seleccione una fecha futura.");
      return; // Evita actualizar el estado si la fecha no es válida
    }
    setSelectedDate(selected);
  };

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

    const generarDiasDelMes = (month) => {
      const fecha = new Date();
      const primerDiaDelMes = new Date(fecha.getFullYear(), month, 1);
      const ultimoDiaDelMes = new Date(fecha.getFullYear(), month + 1, 0);

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
    setDiasDelMes(generarDiasDelMes(selectedMonth)); // Generar días del mes seleccionado
    setMesesDelAnio(generarMesesDelAnio());
  }, [selectedMonth]);

  useEffect(() => {
    const fetchCompanys = async () => {
      showSpinner(true);
      const matchJSON = JSON.stringify({ registeremail: userData.email });
      const aggregateQueryJSON = JSON.stringify([
        { $project: { name: 1, location: 1, play: 1 } },
      ]);
      const response = await findCompanys(matchJSON, aggregateQueryJSON);

      if (response.success && response.companysData) {
        setCompanysData(response.companysData);
      }
      showSpinner(false);
    };

    if (userData.email) {
      fetchCompanys();
    }
  }, [userData.email]);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (e) => {
    const selectedMonthIndex = mesesDelAnio.findIndex(
      (month) => month === e.target.value
    );
    setSelectedMonth(selectedMonthIndex);
  };

  const handleCancelClick = () => {
    setSelectedDate(null);
    setComment("");
    setSelectedCompany("");
  };

  const handleSubmitComment = async () => {
    if (!selectedCompany || !comment || !startDate || !endDate || !startTime || !endTime) {
      alert("Por favor complete todos los campos");
      return;
    }

    const selectedCompanyData = companysData.find(company => company._id === selectedCompany);
    if (!selectedCompanyData) {
      alert("Error: No se encontró la empresa seleccionada");
      return;
    }
    
    const promotionData = {
      companyId: selectedCompany,
      companyName: selectedCompanyData.name,
      description: comment,
      startDate: `${startDate}T${startTime}:00`,
      endDate: `${endDate}T${endTime}:00`,
      createdBy: userData.email,
      location: selectedCompanyData.location || '',
      province: selectedCompanyData.province || '',
      city: selectedCompanyData.city || '',
      coordinates: selectedCompanyData.coordinates || {}
    };

    try {
      showSpinner(true);
      const response = await savePromotion(promotionData);
      showSpinner(false);

      if (response.success) {
        alert("Promoción guardada exitosamente");
        handleCancelClick();
      } else {
        alert(`Error al guardar la promoción: ${response.message || 'Error desconocido'}`);
        console.error("Error response:", response);
      }
    } catch (error) {
      showSpinner(false);
      alert("Error al intentar guardar la promoción");
      console.error("Error al guardar promoción:", error);
    }
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
        className="dashboardCloseBtn"
        onClick={() => {
          const previousSaved = localStorage.getItem("previousPathToDash");
          previousSaved
            ? navigate(localStorage.getItem("previousPathToDash"))
            : navigate("/");
        }}
      >
        Salir
      </button>

      <section className="background-calendario">
        <div>
          <h1 className="titulo-dash">Calendario</h1>
        </div>
        <p className="text-center mb-5">
          Publica GRATIS las próximas fechas de promociones y descuentos que
          ofrecerá tu empresa.
        </p>

        <div className={`container flex justify-around seleccion-mes mb-4`}>
          {/* Control de selección de meses */}
          <select
            value={mesesDelAnio[selectedMonth]}
            onChange={handleMonthChange}
            className="texto-mes"
          >
            {mesesDelAnio.map((mes, index) => (
              <option key={index} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>

        <div className="calendario">
          {diasDelMes.map((dia, index) => (
            <div
              key={index}
              className={`dia-calendario text-center cursor-pointer border rounded-lg ${
                dia === new Date().getDate() ? "highlighted" : ""
              }`}
              onClick={() => handleDateClick(dia)}
            >
              {dia}
            </div>
          ))}
        </div>

        {selectedDate !== null && (
          <div className="popup-container">
            <div className="popup mt-3">
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
                maxLength={25}
              />
              <div>
                <p>Seleccione su empresa</p>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>
                    Seleccione una empresa
                  </option>
                  {companysData.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <p>Inicio de Promo:</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const currentDate = new Date().toISOString().split("T")[0];
                    if (selected < currentDate) {
                      alert(
                        "¡Fecha no disponible! Seleccione una fecha futura."
                      );
                      return;
                    }
                    setStartDate(selected);
                  }}
                />
                <p>Horario de Inicio:</p>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <p>Fin de Promo:</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const currentDate = new Date().toISOString().split("T")[0];
                    if (selected < currentDate) {
                      alert(
                        "¡Fecha no disponible! Seleccione una fecha futura."
                      );
                      return;
                    }
                    if (selected < startDate) {
                      alert(
                        "¡Fecha no válida! La fecha de finalización no puede ser anterior a la fecha de inicio."
                      );
                      return;
                    }
                    setEndDate(selected);
                  }}
                />
                <p>Hora de finalización:</p>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <div className="btn-container mt-3">
                <button
                  className="btn btn-cargar mt-3"
                  onClick={handleSubmitComment}
                >
                  Cargar
                </button>
                <button
                  className="btn btn-cancelar  mt-3"
                  onClick={handleCancelClick}
                >
                  Cancelar
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
