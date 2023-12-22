import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "./carga-empresa.css";
import { addCompany } from "../../utils/apiDb/apiDbAcions";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
const CargaEmpresa = () => {

    const {userData} = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        slogan: "",
        location: "",
        phone: "",
        phone2: "",
        whatsapp: "",
        website: "",
        email: "",
        category: "",
        closing: "",
        social: {
            facebook: "",
            instagram: "",
            twitter: "",
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
        
        const forms = document.querySelectorAll(".companyUpdateForm")
        const formsArr = Array.from(forms);
        const formsDataArr = formsArr.map((form) => new FormData(form));
        let formsDataArrJoin = [];
        formsDataArr.forEach((form) =>{
            formsDataArrJoin = [...formsDataArrJoin, ...form]
        })
        const data = Object.fromEntries(formsDataArrJoin);
        const companyData = {
            name: data.name,
            slogan: data.slogan,
            location: data.location,
            phone: data.phone,
            phone2: data.phone2,
            website: data.website,
            category: data.category,
            description: data.description,
            social: {
                whatsapp: data.whatsapp,
                facebook: data.facebook,
                instagram: data.instagram,
                twitter: data.twitter,
                linkedin: data.linkedin,
                tiktok: data.tiktok,
                youtube: data.youtube,
                email: data.email,
            },
            schedule: {
                opening: "09:00",
                closing: data.closing,
            },
        }
        companyData.registeremail = userData.email;

        const completeData = new FormData();      
        completeData.append("companyTextData", JSON.stringify(companyData));
        completeData.append("files", data.logo);
        completeData.append("files", data.frontimage);
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
            <div className="container">
                <div className="perfil-card container"> 
                    <h2>Carga tu negocio:</h2>
                    <form onSubmit={handleSubmit} className="companyUpdateForm">
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
                                <label>Teléfono alternativo (opcional):</label>
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
                                >
                                    <option value="">Selecciona una categoría</option>
                                    <option>Reparación y Mantenimiento</option>
                                    <option value="gomerias">
                                        Gomerías (arreglo y venta de cubiertas, alineación y
                                        balanceo)
                                    </option>
                                    <option value="talleres">
                                        Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                                    </option>
                                    <option value="repuestos">Repuestos (Autopartes)</option>
                                    <option value="lubricentros">Lubricentros</option>
                                    <option value="venta_alquiler">
                                        Venta y Alquiler de vehículos
                                    </option>
                                    <option value="agencia">
                                        Agencia (Concesionaria oficiales y Agencias particulares)
                                    </option>
                                    <option value="rent_car">
                                        Rent a Car (Alquiler de autos)
                                    </option>
                                    <option value="otros_servicios">Otros Servicios</option>
                                    <option value="aseguradoras">Aseguradoras</option>
                                    <option value="estaciones_servicio">
                                        Estaciones de Servicios
                                    </option>
                                    <option value="estetica_automotor">
                                        Estética del Automotor (Lavaderos, Polarizados)
                                    </option>
                                    <option value="servicios_emergencia">
                                        Servicios de emergencia (Grúas, Cerrajeros)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="card-descripcion">
                    <form onSubmit={handleSubmit} className="companyUpdateForm">
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
                    {" "}
                    <form onSubmit={handleSubmit} className="companyUpdateForm">
                        <div className="form-row">
                            <div className="form-col">
                                <label>Whatsapp:</label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Facebook: </label>
                                <input
                                    type="text"
                                    name="facebook"
                                    value={formData.social.facebook}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Instagram: </label>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={formData.social.instagram}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Twitter: </label>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={formData.social.twitter}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Linkedin: </label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={formData.social.linkedin}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Tik Tok: </label>
                                <input
                                    type="text"
                                    name="tiktok"
                                    value={formData.social.tiktok}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Youtube: </label>
                                <input
                                    type="text"
                                    name="youtube"
                                    value={formData.social.youtube}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Mail: </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="perfil-card">
                    <form onSubmit={handleSubmit} className="companyUpdateForm">
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

                <div className="perfil-card mt-3">
                    <form onSubmit={handleSubmit} className="companyUpdateForm">
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
                                <label className="img-form">Imagen de portada (360x200):</label>
                                <input
                                    type="file"
                                    name="frontimage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />{" "}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label className="img-form">
                                    Otras imágenes (límite hasta 6):{" "}
                                </label>
                                <input className="multiplefiles"
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    max={6}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CargaEmpresa;
