import React, { useState, useContext } from "react";
import "./editar-empresa.css";
import { SpinnerContext } from "../../context/spinnerContext";
import { useParams } from "react-router-dom";
import { findCompany } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";

const EditarEmpresa = () => {
  const { showSpinner } = useContext(SpinnerContext);
  const { name } = useParams();
  const [companyData, setCompanyData] = useState({ name: "" });

  const find = async () => {
    showSpinner(true);
    const response = await findCompany("name", name, "");
    if (response.success && response.companyData) {
      const companyData = response.companyData;
      setCompanyData({
        name: companyData.name,
      });
    } else if (response.success && !response.companyData) {
      swalPopUp("Ops", response.message, "warning");
      showSpinner(false);
      window.location = "/";
    } else {
      swalPopUp("Error", response.message, "error");
    }
    showSpinner(false);
  };

  return (
    <div className="editar-empresa-container">
      <div className="card-editar-empresa">
        <div className="row-editar-empresa">
          <div className="col-editar-empresa">
            <span>{companyData.name}</span>
          </div>
          <div className="col-editar-empresa">
            <span>{companyData.url}</span>
          </div>
          <div className="col-editar-empresa">
            <span role="img" aria-label="Editar">
              ✏️ Editar
            </span>
          </div>
          <div className="col-editar-empresa">
            <span role="img" aria-label="Pausar">
              ⏸️ Pausar
            </span>
          </div>
          <div className="col-editar-empresa">
            <span role="img" aria-label="Eliminar">
              🗑️ Eliminar
            </span>
          </div>
        </div>
        <hr style={{ borderColor: "red" }} />
      </div>
    </div>
  );
};

export default EditarEmpresa;
