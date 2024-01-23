import React, { useState, useContext, useEffect } from "react";
import "./misEmpresas.css";
import { SpinnerContext } from "../../context/spinnerContext";
import { findCompanys, deleteCompanyById, updateCompanyState } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp, swalPopUpWithCallback ,swalPopUpWhitOptionsAndCallback } from "../../utils/swal";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const MisEmpresas = () => {
    const { showSpinner } = useContext(SpinnerContext);
    const [companysData, setCompanysData] = useState([]);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteComp = async (id) => {
        const response = await deleteCompanyById(id);
        if (response.success) {
            swalPopUpWithCallback("Éxito", response.message, "success", find);
        } else {
            swalPopUp("Error", response.message, "error");
        }
    }
  
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
            "success",
        )
    }

    const handleCompnayState = (id, newState) => {
        return async () => {
            const response = await updateCompanyState(id, newState);
            if (response.success) {
                swalPopUpWithCallback("Acción completada", response.message, "success", find);
                find();
            } else {
                swalPopUp("Error", response.message, "error");
            }
        }
    }

    const find = async () => { 
        showSpinner(true);
        
        const matchJSON = JSON.stringify({ registeremail: userData.email });
        const aggregateQueryJSON = JSON.stringify([ {$project: {name: 1, location: 1, play: 1}} ]);
        const response = await findCompanys(matchJSON, aggregateQueryJSON);

        if (response.success && response.companysData) {
            const companysDataFromDB = response.companysData;
            const companysDataJSX = companysDataFromDB.map((company) => 
                <div className="row-editar-empresa flex" key={company._id}>
                    <div className="col-editar-empresa">
                        <span>{company.name}</span>
                    </div>
                    <div className="col-editar-empresa">
                        <span>{company.location}</span>
                    </div>
                    <Link to={`/EditarEmpresa/${company._id}`} className="col-editar-empresa">
                        <span role="img" aria-label="Editar">
                            ✏️ Editar
                        </span>
                    </Link>
                    {   (company.play &&
                        <div className="col-editar-empresa" onClick={handleCompnayState(company._id, false)}>
                            <span role="img" aria-label="Pausar">
                                ⏸️ Pausar
                            </span>
                        </div>)

                        ||

                        (!company.play &&
                        <div className="col-editar-empresa" onClick={handleCompnayState(company._id, true)}>
                            <span role="img" aria-label="Pausar">
                                ▶️ Reactivar
                            </span>
                        </div>)

                    }
                    <div className="col-editar-empresa" onClick={() => deleteCompanyConfirm(company._id)}>
                        <span role="img" aria-label="Eliminar">
                            🗑️ Eliminar
                        </span>
                    </div>
                </div >
            );
            setCompanysData(companysDataJSX);
        } else if (response.success && !response.companysData) {
            setCompanysData([]);
            swalPopUp("Ops!", "No tienes empresas cargadas. Selecciona la opción 'Publicar Ahora' para cargar tu empresa", "info");
            showSpinner(false);
            navigate("/")
        } else {
            swalPopUp("Error", response.message, "error");
        }
        showSpinner(false);
    }

    useEffect(() => {
        if(userData.isLogged) find();
    // eslint-disable-next-line
    }, [userData]);

    return (
        <section className="background">
            <div className="editar-empresa-container">
                {companysData.length ?
                    <div className="card-editar-empresa">
                        {companysData}
                    </div>
                    :
                    <></>
                }
            </div>
        </section>
    );
};

export default MisEmpresas;
