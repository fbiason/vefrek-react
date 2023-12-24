import React, { useState } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./otros-servicios.css";

const OtrosServicios = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "seleccionarSubcategoria") {
      setSelectedOption("");
    } else {
      setSelectedOption(selectedValue);
    }
  };

  return (
    <section className="background">
      <div className="row title-row">
        <h1>Otros Servicios</h1>
      </div>

      <div className="row filter-row mt-3">
        <div className="filtro">
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="" disabled hidden>
              {selectedOption === "" ? "Seleccionar Subcategoría" : ""}
            </option>
            <option value="aseguradoras">Aseguradoras</option>
            <option value="estaciones">Estaciones de Servicios</option>
            <option value="estetica">
              Estetica del Automotor (Lavaderos, Polarizados)
            </option>
            <option value="emergencia">
              Servicios de emergencia (Grúas, Cerrajeros)
            </option>
          </select>
        </div>
      </div>

      <div className="row cards-row justify-content-center mt-5">
        <div className="col-12 col-md-6 col-lg-4 cards-col">
          <CardNegocio />
        </div>
        <div className="col-12 col-md-6 col-lg-4 cards-col">
          <CardNegocio />
        </div>
        <div className="col-12 col-md-6 col-lg-4 cards-col">
          <CardNegocio />
        </div>
      </div>
    </section>
  );
};

export default OtrosServicios;
