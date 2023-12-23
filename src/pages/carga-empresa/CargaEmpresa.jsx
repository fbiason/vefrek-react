import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "./carga-empresa.css";
import { addCompany } from "../../utils/apiDb/apiDbAcions";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";

const CargaEmpresa = () => {
    const { userData } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        slogan: "",
        location: "",
        phone: "",
        phone2: "",
        website: "",
        category: "",
        closing: "",
        social: {
            email: "",
            whatsapp: "",
            facebook: "",
            instagram: "",
            x: "",
            linkedin: "",
            tiktok: "",
            youtube: "",
        },
        description: "",
        logo: null,
        frontimage: null,
        images: [],
        opening: "09:00",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const forms = document.querySelectorAll("form")
        const formsArr = Array.from(forms);
        const formsDataArr = formsArr.map((form) => new FormData(form));
        let formsDataArrJoin = [];
        formsDataArr.forEach((form) => {
            formsDataArrJoin = [...formsDataArrJoin, ...form]
        })
        const data = Object.fromEntries(formsDataArrJoin);
        const companyData = {
            name: data.name || "",
            slogan: data.slogan || "",
            location: data.location || "",
            phone: data.phone || "",
            phone2: data.phone2 || "",
            website: data.website || "",
            category: data.category ? data.category.split(",")[0] : "",
            subcategory: data.category ? data.category.split(",")[1] : "",
            description: data.description,
            social: {
                whatsapp: data.whatsapp || "",
                email: data.email || "",
                facebook: data.facebook || "",
                instagram: data.instagram || "",
                x: data.x || "",
                linkedin: data.linkedin || "",
                tiktok: data.tiktok || "",
                youtube: data.youtube || "",
            },
            schedule: {
                opening: "09:00" || "",
                closing: data.closing || "",
            },
        }
        companyData.registeremail = userData.email;
        
        const completeData = new FormData();
        completeData.append("companyTextData", JSON.stringify(companyData));
        completeData.append("files", data.logo);
        const files = document.querySelector(".multiplefiles").files
        for (const file of files) {
            completeData.append("files", file);
        }
        const response = await addCompany(completeData);
        response.success ? swalPopUp("Tarea completada", response.message, "success") : swalPopUp("Error", response.message, "error");
        // console.log("Datos del formulario:", formData);
    };

    return (
        <div className="perfil-container">
            <div className="container card-carga">
                <div className="perfil-card container">
                    <h2>Carga tu negocio:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Nombre de empresa:</label>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="wide-input"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Slogan:</label>{" "}
                                <input
                                    type="text"
                                    name="slogan"
                                    value={formData.slogan}
                                    onChange={handleChange}
                                    className="wide-input"
                                />{" "}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Ubicación:</label>{" "}
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="wide-input"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label> Teléfono: </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="wide-input"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label className="full-width-label">
                                    Teléfono alternativo (opcional):
                                </label>
                                <input
                                    type="text"
                                    name="phone2"
                                    value={formData.phone2}
                                    onChange={handleChange}
                                    className="wide-input"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Sitio Web (opcional): </label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="wide-input"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label>Categoría: </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="select-custom-width"
                                >
                                    <option value="" disabled hidden>
                                        <span>Selecciona una categoría</span>
                                    </option>
                                    <option disabled style={{ color: "darkgray" }}>
                                        - Reparación y Mantenimiento
                                    </option>
                                    <option value="rep_mant, gomerias">
                                        -- Gomerías (arreglo y venta de cubiertas, alineación y
                                        balanceo)
                                    </option>
                                    <option value="rep_mant, talleres">
                                        -- Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                                    </option>
                                    <option value="rep_mant, repuestos">-- Repuestos (Autopartes)</option>
                                    <option value="rep_mant, lubricentros">-- Lubricentros</option>
                                    <option
                                        disabled
                                        style={{ color: "darkgray" }}
                                        value="venta_alquiler"
                                    >
                                        - Venta y Alquiler de vehículos
                                    </option>
                                    <option value="venta_alq_v, agencia">
                                        -- Agencia (Concesionaria oficiales y Agencias particulares)
                                    </option>
                                    <option value="venta_alq_v, rent_car">
                                        -- Rent a Car (Alquiler de autos)
                                    </option>
                                    <option
                                        disabled
                                        style={{ color: "darkgray" }}
                                        value="otros_servicios"
                                    >
                                        - Otros Servicios
                                    </option>
                                    <option value="otras, aseguradoras">-- Aseguradoras</option>
                                    <option value="otras, estaciones_servicio">
                                        -- Estaciones de Servicios
                                    </option>
                                    <option value="otras, estetica_automotor">
                                        -- Estética del Automotor (Lavaderos, Polarizados)
                                    </option>
                                    <option value="otras, servicios_emergencia">
                                        -- Servicios de emergencia (Grúas, Cerrajeros)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container card-carga">
                <div className="card-descripcion ">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <a>Descripción (hasta 300 caracteres): </a>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    maxLength="300"
                                    className="descripcion"
                                />{" "}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="perfil-card mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Primera columna */}
                            <div className="col-md-6">
                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-whatsapp me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="WhatsApp"
                                    />
                                </div>

                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-facebook me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="facebook"
                                        value={formData.facebook}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Facebook"
                                    />
                                </div>

                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-instagram me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Instagram"
                                    />
                                </div>

                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-tiktok me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="tiktok"
                                        value={formData.tiktok}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="TikTok"
                                    />
                                </div>
                            </div>

                            {/* Segunda columna */}
                            <div className="col-md-6">
                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-linkedin me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="LinkedIn"
                                    />
                                </div>

                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-x me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="x"
                                        value={formData.x}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="X"
                                    />
                                </div>

                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fab fa-youtube me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube"
                                        value={formData.youtube}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Youtube"
                                    />
                                </div>

                                <div className="form-col red-whith d-flex align-items-center">
                                    <label>
                                        <i className="fas fa-envelope me-2"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Mail"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="perfil-card mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <label className="img-form">Logo de la empresa (82x82): </label>
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label className="img-form">
                                    Cargar imágenes (límite hasta 6):{" "}
                                </label>
                                <input 
                                    className="multiplefiles"
                                    type="file"
                                    name="otrasImagenes"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            </div>

            <div className="container card-carga">
                <div className="perfil-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Horario de apertura: </label>
                                <TimePicker
                                    name="opening"
                                    onChange={(value) => handleChange("horarioApertura", value)}
                                    value={formData.opening}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CargaEmpresa;
