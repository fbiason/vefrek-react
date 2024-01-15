import "./editarEmpresa.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import { updateCompany, findCompany, deleteImageOfFirebase } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { useParams, useNavigate } from "react-router-dom";
import { verifyIfHasChanges } from "../../utils/utils";

export default function EditarEmpresa() {
    const {id} = useParams();
    const navigate = useNavigate();
    const formRef = useRef(); 
    const initialData = useRef();
    const { showSpinner } = useContext(SpinnerContext);
    const [formData, setFormData] = useState({
        name: "",
        slogan: "",
        location: "",
        city: "",
        state: "",
        postal_code: "",
        phone: "",
        phone2: "",
        website: "",
        vefrek_website: "",
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
        opening: "09:00",
        email_notifications: {
            comments: false,
            news: false,
        },
        sms_notifications: {
            all: false,
            same_email: false,
            none: true,
        },
        images: {
            logo: {url: "", delete: ""},
            images: [],
        },
        logo_image_name: "",
        images_names: "",
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
            [name]: files[0] ? files[0].name : "",
        });
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            social: {
                ...formData.social,
                [name]: value,
            },
        });
    };

    const handleFilesChange = (e) => {
        const { files } = e.target;
        if (files[0]) {
            const filesArr = Array.from(files); //Files es del tipo "Filelist" y no soporta el metodo "map"
            const filesArrNames = filesArr.map((file) => (
                <p className="company_images_names">{file.name}</p>
            ));
            setFormData({
                ...formData,
                ...{ images_names: filesArrNames },
            });
        }
    };

    const loadFile = (e) => {
        e.target.nextSibling.click();
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        const categoryValue = value.split(",")[0].trim();
        const subcategoryValue = value.split(",")[1].trim();
        setFormData({
            ...formData,
            ...{
                category: categoryValue,
                subcategory: subcategoryValue,
            },
        });
    };

    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        if (typeof checked === "boolean") {
            if (name === "news" || name === "comments") {
                setFormData({
                    ...formData,
                    email_notifications: {
                        ...formData.email_notifications,
                        [name]: checked,
                    },
                });
            } else {
                setFormData({
                    ...formData,
                    sms_notifications: {
                        all: false,
                        same_email: false,
                        none: false,
                        [name]: true,
                    },
                });
            }
        }
    };

    useEffect(() => {
        formRef.current = formData;
    }, [formData]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const companyData = formRef.current;
        const completeData = new FormData();
        completeData.append("companyTextData", JSON.stringify(companyData));
        const logoInput = document.querySelector(".company_logo_input"); 
        const logoFile = logoInput.files[0];
        completeData.append("logo", logoFile);
        const imagesInput = document.querySelector(".company_images_input");
        const imagesFiles = imagesInput.files;
                      
        if (!verifyIfHasChanges(initialData.current, formRef.current) && logoInput.files.length === 0 && imagesInput.files.length === 0) {
            swalPopUp("Ops!", "No hay cambios para guardar", "warning");
            return;
        }    

        for (const file of imagesFiles) {
            completeData.append("images", file);
        }
        showSpinner(true);
        const response = await updateCompany(id, completeData);
        if (response.success) {
            find();
            logoInput.value = "";           //Vaciamos inputs de imagenes
            imagesInput.value = "";
            swalPopUp("Tarea completada", response.message, "success")
        } else {
            swalPopUp("Error", response.message, "error");
        }
        showSpinner(false);
    };

    const find = async () => {
        showSpinner(true);
        const response = await findCompany("_id", id, "");
        const companyData = response.companyData;
               
        if(!response.success && !response.message.includes("pausado")) {
            showSpinner(false);
            swalPopUp("Ops!", response.message, "error");
            navigate("/");
            return;
        } else if (!response.success && response.message.includes("pausado")) {
            showSpinner(false);
            swalPopUp("Ops!", "No Autorizado: No tienes los permisos necesarios para editar esta empresa", "warning");
            navigate("/");
            return;
        };
        showSpinner(false);

        const auxFormData = {
            registeremail: companyData.registeremail,
            name: companyData.name,
            slogan: companyData.slogan,
            location: companyData.location,
            city: companyData.city,
            state: companyData.state,
            postal_code: companyData.postal_code,
            phone: companyData.phone,
            phone2: companyData.phone2,
            website: companyData.website,
            vefrek_website: companyData.vefrek_website,
            category: companyData.category,
            subcategory: companyData.subcategory,
            closing: companyData.schedule.closing,
            social: {
                email: companyData.social.email,
                whatsapp: companyData.social.whatsapp,
                facebook: companyData.social.facebook,
                instagram: companyData.social.instagram,
                x: companyData.social.x,
                linkedin: companyData.social.linkedin,
                tiktok: companyData.social.tiktok,
                youtube: companyData.social.youtube,
            },
            description: companyData.description,
            opening: companyData.schedule.opening,
            email_notifications: {
                comments: companyData.email_notifications.comments,
                news: companyData.email_notifications.news,
            },
            sms_notifications: {
                all: companyData.sms_notifications.all,
                same_email:  companyData.sms_notifications.same_email,
                none:  companyData.sms_notifications.none,
            },
            images: {
                logo: companyData.images.logo,
                images: companyData.images.images,
            },
        }

        setFormData(structuredClone(auxFormData));
        initialData.current = structuredClone(auxFormData);
             
        const optionsSelect = document.querySelector(".form_select");
        if (optionsSelect) {
            const options = optionsSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value.split(",")[1] && options[i].value.split(",")[1].trim() === companyData.subcategory) {
                    options[i].selected = true;
                    break;
                }
            }
        }
    }

    useEffect(() => {
        find();
    // eslint-disable-next-line
    }, [id]);
       
    const deleteImg = async (deletePath) => {
        try {
            const response = await deleteImageOfFirebase(deletePath);
            if (response.success) {
                swalPopUp("Tarea completada", response.message);
                find();
            } else {
                swalPopUp("Ops!", response.message, "warning");
            }   
        } catch (err) {
            swalPopUp("Ops!", `Error al eliminar imagen del servidor: ${err.message}`, "error");
        }
    }

    return (
        <section className="background">
            <div className="container">
                <form
                    className="form-prueba border border-gray-300 rounded-md p-4 p-lg-6"
                    onSubmit={handleSubmit}
                >
                    <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="font-semibold leading-7 text-gray-900 mt-3">
                            Edición de negocio
                        </h1>
                        <p className="mt-5 text-sm leading-6 text-gray-600">
                            Si es propietario de un negocio referido al rubro automotor puede
                            cargarlo <b>GRATIS</b> en nuestro sitio web.
                        </p>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm w-full font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Nombre de Empresa
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.name}
                                        type="text"
                                        name="name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="slogan"
                                    className="block text-sm font-medium leading-6 text-gray-900 w-full "
                                >
                                    Slogan (opcional)
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.slogan}
                                        type="text"
                                        name="slogan"
                                        id="slogan"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="street-address"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Dirección
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.location}
                                        type="text"
                                        name="location"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Ciudad
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.city}
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="region"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Provincia
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.state}
                                        type="text"
                                        name="state"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="postal-code"
                                    className="block text-sm w-full font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Código Postal
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.postal_code}
                                        type="text"
                                        name="postal_code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-5">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Teléfono
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.phone}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-5">
                                <label
                                    htmlFor="phone2"
                                    className="block text-sm font-medium leading-6 text-gray-900 w-full "
                                >
                                    Teléfono Alternativo (opcional)
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.phone2}
                                        type="text"
                                        name="phone2"
                                        id="phone2"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-5">
                                <label
                                    htmlFor="website"
                                    className="block text-sm font-medium leading-6 text-gray-900 w-full "
                                >
                                    Sitio Web (opcional):
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.website}
                                        type="text"
                                        name="website"
                                        id="website"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                    <label>
                                        <i className="obligatorio">* </i>Categoría:{" "}
                                    </label>
                                    <select
                                        name="category"
                                        onChange={handleCategoryChange}
                                        className="form_select"
                                    >
                                        <option value="" disabled hidden>
                                            <span>Selecciona una categoría</span>
                                        </option>
                                        <option disabled style={{ color: "darkgray" }}>
                                            - Reparación y Mantenimiento
                                        </option>
                                        <option value="Reparación y mantenimiento, Gomería">
                                            -- Gomerías (arreglo y venta de cubiertas, alineación y
                                            balanceo)
                                        </option>
                                        <option value="Reparación y mantenimiento, Taller mecánico">
                                            -- Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                                        </option>
                                        <option value="Reparación y mantenimiento, Repuestos">
                                            -- Repuestos (Autopartes)
                                        </option>
                                        <option value="Reparación y mantenimiento, Lubricentro">
                                            -- Lubricentros
                                        </option>
                                        <option
                                            disabled
                                            style={{ color: "darkgray" }}
                                            value="venta_alquiler"
                                        >
                                            - Venta y Alquiler de vehículos
                                        </option>
                                        <option value="Venta y alquiler de vehículos, Agencia">
                                            -- Agencia (Concesionaria oficiales y Agencias
                                            particulares)
                                        </option>
                                        <option value="Venta y alquiler de vehículos, Rent a Car">
                                            -- Rent a Car (Alquiler de autos)
                                        </option>
                                        <option
                                            disabled
                                            style={{ color: "darkgray" }}
                                            value="otros_servicios"
                                        >
                                            - Otros Servicios
                                        </option>
                                        <option value="Otros servicios, Aseguradora">
                                            -- Aseguradoras
                                        </option>
                                        <option value="Otros servicios, Estación de Servicio">
                                            -- Estaciones de Servicios
                                        </option>
                                        <option value="Otros servicios, Estética del automotor">
                                            -- Estética del Automotor (Lavaderos, Polarizados)
                                        </option>
                                        <option value="Otros servicios, Servicios de Emergencia">
                                            -- Servicios de emergencia (Grúas, Cerrajeros)
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="linea-divisoria"></div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-gray-900  w-full "
                                >
                                    <i className="obligatorio">* </i>Ingrese la URL de su sitio
                                    web comercial:
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                            vefrek.com/
                                        </span>
                                        <input
                                            value={formData.vefrek_website}
                                            onChange={handleChange}
                                            type="text"
                                            name="vefrek_website"
                                            id="username"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="nombre-negocio"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <i className="obligatorio">* </i>Descripción
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={formData.description}
                                        onChange={handleChange}
                                        id="about"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=" Describa brevemente su empresa."
                                    />
                                </div>
                            </div>

                            <div className="perfil-card col-span-full">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-whatsapp me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="whatsapp"
                                                    value={formData.social.whatsapp}
                                                    className="form-control"
                                                    placeholder="*WhatsApp"
                                                />
                                            </div>

                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-facebook me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="facebook"
                                                    value={formData.social.facebook}
                                                    className="form-control"
                                                    placeholder="Facebook"
                                                />
                                            </div>

                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-instagram me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="instagram"
                                                    value={formData.social.instagram}
                                                    className="form-control"
                                                    placeholder="Instagram"
                                                />
                                            </div>

                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-tiktok me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="tiktok"
                                                    value={formData.social.tiktok}
                                                    className="form-control"
                                                    placeholder="TikTok"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-linkedin me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="linkedin"
                                                    value={formData.social.linkedin}
                                                    className="form-control"
                                                    placeholder="LinkedIn"
                                                />
                                            </div>

                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-x me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="social.text"
                                                    name="x"
                                                    value={formData.social.x}
                                                    className="form-control"
                                                    placeholder="X"
                                                />
                                            </div>

                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fab fa-youtube me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="youtube"
                                                    value={formData.social.youtube}
                                                    className="form-control"
                                                    placeholder="Youtube"
                                                />
                                            </div>

                                            <div className="form-col social-placeholder d-flex align-items-center">
                                                <label>
                                                    <i className="fas fa-envelope me-2"></i>
                                                </label>
                                                <input
                                                    onChange={handleSocialChange}
                                                    type="text"
                                                    name="email"
                                                    value={formData.social.email}
                                                    className="form-control"
                                                    placeholder="*Mail"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="linea-divisoria col-span-full"></div>

                    <div className="col-span-full mt-3">
                        <div className="col-span-full">
                            <label
                                htmlFor="photo"
                                className="block text-sm font-medium leading-6 text-gray-900 mt-3 w-full "
                            >
                                <i className="obligatorio">* </i>Logo de su empresa
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">

                                {formData.images.logo.url ? 
                                <img src={formData.images.logo.url} alt="Logo" className="editarEmpresa_logo"/> :               
                                <UserCircleIcon
                                    className="h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                />
                                }     

                                <button
                                    onClick={loadFile}
                                    type="button"
                                    className="button-small rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Cambiar
                                </button>
                                <input
                                    onChange={handleFileChange}
                                    className="company_logo_input"
                                    type="file"
                                    name="logo_image_name"
                                    accept="image/*"
                                    single="true"
                                />
                                {formData.logo_image_name}
                            </div>
                        </div>
                        <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium leading-6 text-gray-900 mt-5 col-span-full  w-full "
                        >
                            <i className="obligatorio">* </i>Cargar imágenes de su negocio
                            (máximo 6):
                        </label>

                        <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mx-auto">
                            <div className="text-center">
                                <PhotoIcon
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                />
                                <div className="mt-4 text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 cargar-img"
                                    >
                                        <span>Cargar imagenes </span>
                                        <input
                                            onChange={handleFilesChange}
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only company_images_input"
                                            multiple={true}
                                            max={6}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                                <div name="images_names" className="flex wrap">
                                    {formData.images_names}
                                </div>
                            </div>
                        </div>

                        <div className="editarEmpresa_imagenes_cont flex wrap">
                            {
                                formData.images.images.length > 0  ?
                                formData.images.images.map((data, i) =>
                                <div className="editarEmpresa_imagen_cont" key={i}>
                                    <img src={data.url} alt="Imágenes empresa" className="editarEmpresa_imagen" />
                                    <img 
                                        src="/images/icons/delete.png" 
                                        alt="Delete" 
                                        title="Eliminar imagen"
                                        className="editarEmpresa_delete_icon" 
                                        onClick={() => deleteImg(data.delete)}
                                    />
                                </div>)
                                :
                                <></>
                            }
                        </div>        

                        <div className="mt-5">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                *Campos obligatorios
                            </span>
                        </div>
                    </div>

                    <div className="linea-divisoria col-span-full mt-5"></div>

                    <div className="mt-5">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Notificaciones
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Siempre te informaremos sobre cambios importantes, pero tú eliges
                            qué las notificaciones que desees recibir.
                        </p>

                        <div className="mt-3 space-y-10 ">
                            <fieldset>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                onChange={handleCheckChange}
                                                checked={formData.email_notifications.comments}
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />{" "}
                                            <label
                                                htmlFor="comments"
                                                className="text-sm leading-6 pl-3 font-medium text-gray-900"
                                            >
                                                Comentarios
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                onChange={handleCheckChange}
                                                checked={formData.email_notifications.news}
                                                id="news"
                                                name="news"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />{" "}
                                            <label
                                                htmlFor="news"
                                                className="text-sm leading-6 pl-3 font-medium text-gray-900"
                                            >
                                                Novedades de Vefrek
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">
                                    Notificaciones push
                                </legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Estos se envían por SMS a su teléfono móvil.
                                </p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            onChange={handleCheckChange}
                                            checked={formData.sms_notifications.all}
                                            id="push-everything"
                                            name="all"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="push-everything"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Todo
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            onChange={handleCheckChange}
                                            checked={formData.sms_notifications.same_email}
                                            id="push-email"
                                            name="same_email"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="push-email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Igual que el correo electrónico
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            onChange={handleCheckChange}
                                            checked={formData.sms_notifications.none}
                                            id="push-nothing"
                                            name="none"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="push-nothing"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Sin notificaciones push
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-white rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-green-500 px-3 py-2 text-white text-sm font-semibold shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </section> 
    );
}
