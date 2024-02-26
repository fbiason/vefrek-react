import React, { useState, useEffect, useContext } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./categorias.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";

const Reparacion = () => {
	const { showSpinner } = useContext(SpinnerContext);
	const [data, setData] = useState([]);
	const [rangeValue, setRangeValue] = useState(1);
	
	const dbQuerys = {
		todo: ["Gomería", "Taller mecánico", "Repuestos", "Lubricentro"],
		gomeria: ["Gomería"],
		taller: ["Taller mecánico"],
		repuestos: ["Repuestos"],
		lubricentro: ["Lubricentro"],
	}

	const setCompanys = async (subcategorysArr) => {
		const matchJSON = JSON.stringify({ subcategory: {$in: subcategorysArr} });
		const aggregateQueryJSON = JSON.stringify([
			// { $sample: { size: 8 } },
			{
				$project: {
					subcategory: 1,
					name: 1,
					"images.images": 1,
					location: 1,
					phone: 1,
					_id: 1,
					vefrek_website: 1,
					favorites: 1,
				},
			},
		]);

		showSpinner(true);
		const response = await findCompanys(matchJSON, aggregateQueryJSON);
		if (response.success && response.companysData) {
			const jsxArr = response.companysData.map((company) => (
				<div className="col-md-4 col-xl-4 card-portfolio" key={company._id}>
					<CardNegocio
						subcategory={company.subcategory}
						name={company.name}
						imgUrl={
							company.images.images[0] ? company.images.images[0].url : ""
						}
						location={company.location}
						phone={company.phone}
						id={company._id}
						vefrek_website={company.vefrek_website}
						favorites={company.favorites}
					/>
				</div>
			));
			setData(jsxArr);
		} else if (response.success && !response.companysData) {
			setData(<p>No hay resultados</p>);
		} else {
			swalPopUp("Ops!", response.message, "error");
		}
		showSpinner(false);
	};

	useEffect(() => {
        setCompanys(dbQuerys.todo);
		// eslint-disable-next-line 
	}, []);

	const handleSelectChange = (e) => {
		setCompanys(dbQuerys[e.target.value]);
	};

	const handleRangeChange = (e) => {
		setRangeValue(e.target.value);
	};

	return (
		<div className="background categorias">
			<div className="container text-center text-lg-start p-4">
				<div className="row gx-lg-5 align-items-center mb-5">
					<div className="col-xxl-12 p-5">
						<h1>Reparación y Mantenimiento</h1>
					</div>
				</div>

				<div className="row filter-row mt-3">
					<label htmlFor="customRange1" className="form-label">
						Km de distancia
					</label>
					<input
						type="range"
						className="form-range"
						id="customRange1"
						min="1"
						max="300"
						step="1"
						value={rangeValue}
						onChange={handleRangeChange}
					/>
					<output id="rangevalue" className="p-3">
						{rangeValue}
					</output>
				</div>

				<div className="row filter-row mt-3">
					<div className="col-md-6 col-lg-4 filtro">
						<select
							onChange = {handleSelectChange}
							className = "form-select"
						>
							<option value = "" disabled selected>
								Seleccionar Subcategoría
							</option>
							<option value = "todo">
								Todo
							</option>
							<option value = "gomeria">
								Gomerías (arreglo y venta de cubiertas, alineación y balanceo)
							</option>
							<option value = "taller">
								Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
							</option>
							<option value = "repuestos" >
								Repuestos (Autopartes)
							</option>
							<option value = "lubricentro" >
								Lubricentros
							</option>
						</select>
					</div>
				</div>

				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-5 container-card">
					{data}
				</div>
			</div>
		</div>
	);
};

export default Reparacion;
