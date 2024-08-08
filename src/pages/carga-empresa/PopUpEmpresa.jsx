import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const PopUpEmpresa = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [comment, setComment] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("empresa1");

  const handleCancelClick = () => {
    setSelectedDate(null);
    setComment("");
    setSelectedCompany("empresa1");
    onClose();
  };

  const handleSubmitComment = () => {
    console.log("Comentario:", comment);
    console.log("Empresa seleccionada:", selectedCompany);
    setComment("");
    setSelectedCompany("empresa1");
    setSelectedDate(null);
    onClose();
  };

  return (
    <div className="popCarga1">
      <div>
        {selectedDate !== null && (
          <div className="popCarga">
            <h4>
              La empresa que intenta cargar ya se encuentra cargada por otro
              usuario:
            </h4>
            <p>Usuario: fbiason</p>
            <p>Empresa: Biason Automotores </p>
            <p>Provincia: Santa Cruz </p>
            <p>Localidad:Tierra del Fuego </p>
            <p>Dirección: Rivadavia 1.333 </p>
            <div>
              <button
                className="btn btn-reclamar"
                onClick={handleSubmitComment}
              >
                Reclamar negocio
              </button>
              <button className="btn btn-cancelar" onClick={handleCancelClick}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpEmpresa;
