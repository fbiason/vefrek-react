import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "./carga-empresa.css";
import { addCompany, updateCompany, findCompany } from "../../utils/apiDb/apiDbAcions";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const CargaEmpresa = () => {

    const {userData} = useContext(UserContext);
    const [formData, setFormData] = useState({
        empresa: "",
        slogan: "",
        ubicacion: "",
        telefono: "",
        telefono2: "",
        whatsapp: "",
        sitioWeb: "",
        mail: "",
        categoria: "",
        horarioApertura: "",
        socialMedia: {
            facebook: "",
            instagram: "",
            twitter: "",
            linkedin: "",
            tiktok: "",
            youtube: "",
        },
        descripcion: "",
        logo: null,
        imagenPortada: null,
        otrasImagenes: [],
        horarioApertura: "09:00",
    });

    useEffect(() => {
        
        const loadData = async () => {
            const response = await findCompany("registeremail", userData.email, "")
            if (response.companyData) {
                const data = response.companyData;
                setFormData({
                    empresa: data.name,
                    slogan: data.slogan,
                    ubicacion: data.location,
                    telefono: data.phone,
                    telefono2: data.phone2,
                    whatsapp: data.social? data.social.whatsapp : "",
                    sitioWeb: data.website,
                    mail: data.social? data.social.email : "",
                    categoria: data.category,
                    horarioApertura: data.schedule? data.schedule.closing : "",
                    socialMedia: {
                        facebook: data.social? data.social.facebook : "",
                        instagram: data.social? data.social.instagram : "",
                        twitter: data.social? data.social.twitter : "",
                        linkedin: data.social? data.social.linkedin : "",
                        tiktok: data.social? data.social.tiktok : "",
                        youtube: data.social? data.social.youtube : "",
                    },
                    descripcion: data.description,
                    logo: data.logo,
                    imagenPortada: data.frontimage,
                    otrasImagenes: [],
                    horarioApertura: "09:00",
                })
            }
        }
        
        loadData();

    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
    };

    return (
        <div className="perfil-container">
            <div className="container">
                <div className="perfil-card container">
                    <h2>Carga tu negocio:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Nombre de empresa:</label>
                                <div>
                                    <input
                                        type="text"
                                        name="empresa"
                                        value={formData.empresa}
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
                                    name="ubicacion"
                                    value={formData.ubicacion}
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
                                    name="telefono"
                                    value={formData.telefono}
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
                                    name="telefono2"
                                    value={formData.telefono2}
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
                                    name="sitioWeb"
                                    value={formData.sitioWeb}
                                    onChange={handleChange}
                                    className="wide-input"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Categoría: </label>
                                <select
                                    name="categoria"
                                    value={formData.categoria}
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <a>Descripción (hasta 300 caracteres): </a>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
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
                    <form onSubmit={handleSubmit}>
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
                                    name="socialMedia.facebook"
                                    value={formData.socialMedia.facebook}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Instagram: </label>
                                <input
                                    type="text"
                                    name="socialMedia.instagram"
                                    value={formData.socialMedia.instagram}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Twitter: </label>
                                <input
                                    type="text"
                                    name="socialMedia.twitter"
                                    value={formData.socialMedia.twitter}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Linkedin: </label>
                                <input
                                    type="text"
                                    name="socialMedia.linkedin"
                                    value={formData.socialMedia.linkedin}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Tik Tok: </label>
                                <input
                                    type="text"
                                    name="socialMedia.tiktok"
                                    value={formData.socialMedia.tiktok}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Youtube: </label>
                                <input
                                    type="text"
                                    name="socialMedia.youtube"
                                    value={formData.socialMedia.youtube}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Mail: </label>
                                <input
                                    type="text"
                                    name="mail"
                                    value={formData.mail}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="perfil-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Horario de apertura: </label>
                                <TimePicker
                                    name="horarioApertura"
                                    onChange={(value) => handleChange("horarioApertura", value)}
                                    value={formData.horarioApertura}
                                />
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
                                <label className="img-form">Imagen de portada (360x200):</label>
                                <input
                                    type="file"
                                    name="imagenPortada"
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
                                <input
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
        </div>
    );
};

export default CargaEmpresa;
