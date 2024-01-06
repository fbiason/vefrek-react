import React, { useState, useContext, useEffect } from "react";
import "./editar-empresa.css";
import { SpinnerContext } from "../../context/spinnerContext";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { UserContext } from "../../context/userContext";

const EditarEmpresa = () => {
    const { showSpinner } = useContext(SpinnerContext);
    const [companysData, setCompanysData] = useState([]);
    const { userData } = useContext(UserContext);

    const find = async () => {
        showSpinner(true);
        const response = await findCompanys(JSON.stringify({"registeremail": userData.email}), "name location");
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
                </div >
            );
            setCompanysData(companysDataJSX);
        } else if (response.success && !response.companysData) {
            swalPopUp("Ops", response.message, "warning");
            showSpinner(false);
            // window.location = "/";
        } else {
            swalPopUp("Error", response.message, "error");
        }
        showSpinner(false);
    };

    useEffect(() => {
        if(userData.email) find();
    }, [userData.email]);

    return (
        <section className="background">
            {" "}
            <div className="editar-empresa-container">
                <div className="card-editar-empresa">
                    {companysData}
                </div>
            </div>
        </section>
    );
};

export default EditarEmpresa;
