import React, { useState, useEffect, useContext } from "react";
import CardNegocio2 from "../../components/CardNegocio2";
import "./venta.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";

const Venta = () => {
    const { showSpinner } = useContext(SpinnerContext);
    const [selectedOption, setSelectedOption] = useState("");
    const [data, setData] = useState([]);

    const downloadData = async (category, subcategory) => {
        const queryOBJ = { category: category };
        if (subcategory) queryOBJ.subcategory = subcategory;
        const queryJSON = JSON.stringify(queryOBJ);
        showSpinner(true);
        const response = await findCompanys(queryJSON, "subcategory name images location phone _id");
        if (response.success && response.companysData) {
            const jsxArr = response.companysData.map((company) =>
                <div className="col-12 col-md-6 col-lg-4 cards-col" key={company._id}>
                    <CardNegocio2
                        subcategory={company.subcategory}
                        name={company.name}
                        imgUrl={company.images.images[0].url}
                        logoUrl={company.images.logo.url}
                        location={company.location}
                        phone={company.phone}
                        id={company._id}
                    />
                </div>
            )
            setData(jsxArr);
        } else if (response.success && !response.companysData) {
            setData(<p>No hay resultados</p>);
            console.log(response.message);
        } else {
            swalPopUp("Ops!", response.message, "error");
        }
        showSpinner(false);
    }

    useEffect(() => {
        downloadData("Venta y alquiler de vehículos");
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        downloadData("Venta y alquiler de vehículos", e.target.value);
        if (selectedValue === "seleccionarSubcategoria") {
            setSelectedOption("");
        } else {
            setSelectedOption(selectedValue);
        }
    };

    return (
        <section className="background">
            <div className="row title-row">
                <h1>Venta y Alquiler de Vehículos</h1>
            </div>

            <div className="row filter-row mt-3">
                <div className="filtro">
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled hidden>
                            {selectedOption === "" ? "Seleccionar Subcategoría" : ""}
                        </option>
                        <option value="Agencia">Agencias</option>
                        <option value="Rent a Car">Rent a Car</option>
                    </select>
                </div>
            </div>

            <div className="row cards-row justify-content-center mt-5">
                <div className="d-flex flex-wrap justify-content-center text-center">
                    {data}
                </div>
            </div>
        </section>
    );
};

export default Venta;
