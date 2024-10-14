import React, { useState, useContext, useEffect } from "react";
import { SpinnerContext } from "../../context/spinnerContext";
import {
  findCompanys,
  deleteCompanyById,
  updateCompanyState,
} from "../../utils/apiDb/apiDbAcions";
import {
  swalPopUp,
  swalPopUpWithCallback,
  swalPopUpWhitOptionsAndCallback,
} from "../../utils/swal";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import NavBarDash from "./NavBarDash";

const NegociosDash = () => {
  const [companysData, setCompanysData] = useState([]);
  const { userData } = useContext(UserContext);
  const { showSpinner } = useContext(SpinnerContext);
  const navigate = useNavigate();

  const deleteComp = async (id) => {
    const response = await deleteCompanyById(id);
    if (response.success) {
      swalPopUpWithCallback("Éxito", response.message, "success", find);
    } else {
      swalPopUp("Error", response.message, "error");
    }
  };

  const deleteCompanyConfirm = (id) => {
    swalPopUpWhitOptionsAndCallback(
      "warning",
      "Quieres eliminar la empresa? los datos no podrán recuperarse",
      "Eliminar",
      "Cancelar",
      false,
      "",
      "",
      () => deleteComp(id),
      true,
      "Eliminación cancelada",
      "success"
    );
  };

  const handleCompnayState = (id, newState) => {
    return async () => {
      showSpinner(true);
      const response = await updateCompanyState(id, newState);
      if (response.success) {
        swalPopUpWithCallback(
          "Acción completada",
          response.message,
          "success",
          find
        );
      } else {
        swalPopUp("Error", response.message, "error");
      }
      showSpinner(false);
    };
  };

  const find = async () => {
    showSpinner(true);

    const matchJSON = JSON.stringify({ registeremail: userData.email });
    const aggregateQueryJSON = JSON.stringify([
      { $project: { name: 1, location: 1, play: 1 } },
    ]);
    const response = await findCompanys(matchJSON, aggregateQueryJSON);

    if (response.success && response.companysData) {
      const companysDataFromDB = response.companysData;
      const companysDataJSX = companysDataFromDB.map((company) => (
        <div className="businessCard" key={company._id}>
          <div className="companyDetails">
            <div className="companyName">{company.name}</div>{" "}
            {/* Nombre en su propia fila */}
            <div className="companyLocation">{company.location}</div>{" "}
            {/* Dirección en su propia fila */}
          </div>
          <div className="companyActions">
            <Link to={`/EditarEmpresa/${company._id}`} className="editBtn">
              ✏️ Editar
            </Link>
            {company.play ? (
              <button
                className="pauseBtn"
                onClick={handleCompnayState(company._id, false)}
              >
                ⏸️ Pausar
              </button>
            ) : (
              <button
                className="reactivateBtn"
                onClick={handleCompnayState(company._id, true)}
              >
                ▶️ Reactivar
              </button>
            )}
            <button
              className="deleteBtn"
              onClick={() => deleteCompanyConfirm(company._id)}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ));
      setCompanysData(companysDataJSX);
    } else if (response.success && !response.companysData) {
      setCompanysData([]);
      swalPopUp(
        "Ops!",
        "No tienes empresas cargadas. Selecciona la opción 'Publicar Ahora' para cargar tu empresa",
        "info"
      );
      showSpinner(false);
      navigate("/");
    } else {
      swalPopUp("Error", response.message, "error");
    }
    showSpinner(false);
  };

  useEffect(() => {
    if (userData.isLogged) find();
    // eslint-disable-next-line
  }, [userData]);

  return (
    <main className="dashboardMain">
      <NavBarDash />
      <button
        className="dashboardCloseBtn"
        onClick={() => {
          const previousSaved = localStorage.getItem("previousPathToDash");
          previousSaved ? navigate(previousSaved) : navigate("/");
        }}
      >
        Salir
      </button>

      <div className="contenidoNegocios">
        <div>
          <h1 className="tituloDash">Mis Negocios</h1>
        </div>
        <div className="businessGrid">
          {companysData.length ? companysData : <></>}
        </div>
      </div>
    </main>
  );
};

export default NegociosDash;
