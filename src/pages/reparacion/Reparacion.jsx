import React, { useState } from "react";
import "./reparacion.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { useEffect } from "react";
import CardNegocio2 from "../../components/CardNegocio2";

const Reparacion = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        
        const downloadData = async () => {
            const response = await findCompanys("category", "rep_mant", "subcategory name images location phone _id");
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
                        />
                    </div>
                )
                setData(jsxArr);    
            }
        }

        downloadData();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;

        // Ocultar la opción "Seleccionar Subcategoría" después de seleccionarla
        if (selectedValue === "seleccionarSubcategoria") {
            setSelectedOption("");
        } else {
            setSelectedOption(selectedValue);
        }

        // Aquí puedes manejar la lógica según la opción seleccionada, si es necesario
    };

    return (
        <section className="background">
            <div className="row title-row">
                <h1>Reparacion y Mantenimiento</h1>
            </div>

            <div className="row filter-row mt-3">
                <div className="filtro">
                    <label>Filtrar por:</label>
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled hidden>
                            {selectedOption === "" ? "Seleccionar Subcategoría" : ""}
                        </option>
                        <option value="gomerias">
                            Gomerías (arreglo y venta de cubiertas, alineación y balanceo)
                        </option>
                        <option value="talleres">
                            Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                        </option>
                        <option value="repuestos">Repuestos (Autopartes)</option>
                        <option value="lubricentros">Lubricentros</option>
                    </select>
                </div>
            </div>

            <div className="row cards-row justify-content-center mt-5">
                {data}
            </div>
        </section>
    );
};

export default Reparacion;
