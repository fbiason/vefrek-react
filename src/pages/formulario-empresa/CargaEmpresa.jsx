import React, { useState, useRef, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import { addCompany } from "../../utils/apiDb/apiDbAcions";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import localidadesData from "./localidades.json";
// import PopUpEmpresa from "./PopUpEmpresa";

const formDataInitialValues = {
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
    subcategory: "",
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
    email_notifications: {
        comments: false,
        news: false,
    },
    sms_notifications: {
        all: false,
        same_email: false,
        none: true,
    },
    logo_image_name: "",
    images_names: "",
    schedules: {
        scheduleType: "LaV",
        personalized: {
            lunes: { open1: "", close1: "", open2: "", close2: "" },
            martes: { open1: "", close1: "", open2: "", close2: "" },
            miercoles: { open1: "", close1: "", open2: "", close2: "" },
            jueves: { open1: "", close1: "", open2: "", close2: "" },
            viernes: { open1: "", close1: "", open2: "", close2: "" },
            sabado: { open1: "", close1: "", open2: "", close2: "" },
            domingo: { open1: "", close1: "", open2: "", close2: "" },
        },
        custom: {
            open1: "",
            close1: "",
            open2: "",
            close2: "",
        },
    }
}

const CargaEmpresa = () => {
    const { userData } = useContext(UserContext);
    const formRef = useRef();
    const { showSpinner } = useContext(SpinnerContext);
    const [formData, setFormData] = useState(formDataInitialValues);

    // PopUp
    // const [showPopup, setShowPopup] = useState(false);
    // const handleGuardar = () => {
    //     setShowPopup(true);
    // };
    // const handleClosePopup = () => {
    //     setShowPopup(false);
    // };

    // Inico API
    // const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [selectedProvincia, setSelectedProvincia] = useState("");

    // Obtener la lista de provincias a partir de localidadesData
    const provinciasList = [
        ...new Set(
            localidadesData.localidades.map((localidad) => localidad.provincia.nombre)
        ),
    ];

    const setCitiesList = (stateSelect) => {
        const ciudadesList = localidadesData.localidades
            .filter((localidad) => localidad.provincia.nombre === stateSelect)
            .map((localidad) => localidad.nombre);
        setCiudades(ciudadesList);
    }
 
    const handleProvinciaChange = (e) => {
        const stateSelect = e.target.value;
        setCitiesList(stateSelect);

        setFormData({
            ...formData,
            state: e.target.value,
        });
    };

    // Fin Api

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
            const filesArr = Array.from(files);
            const filesArrNames = filesArr.map((file) => <p>{file.name}</p>);
            setFormData({
                ...formData,
                ...{ images_names: filesArrNames },
            });
        }
    };

    const loadFile = (e) => {
        e.target.nextSibling.click();
    };

    const selectImages = (e) => {
        const inputFiles = e.target.querySelector("input");
        if (inputFiles) inputFiles.click();
    };

    // const handleCategoryChange = (e) => {
    //     const { value } = e.target;
    //     const categoryValue = value.split(",")[0].trim();
    //     const subcategoryValue = value.split(",")[1].trim();
    //     setFormData({
    //         ...formData,
    //         ...{
    //             category: categoryValue,
    //             subcategory: subcategoryValue,
    //         },
    //     });
    // };

    const [categoryANDsubcategoryStringJoin, setCategoryANDsubcategoryStringJoin] = useState("");

    const handleCategoryANDsubcategorySelect = (e) => {                                         //Obtenemos la categoria y subcategoria del select y las guardamos en el formData
        const {value} = e.target;
        const category = value.split(", ")[0].trim();
        const subcategory = value.split(", ")[1].trim();
        setFormData((current) => ({...current, category, subcategory}));
        setCategoryANDsubcategoryStringJoin(value);
    };

    useEffect(() => {                                                                           //Carga inicial de datos desde el localstorage (si hay data guardada)
        const cargaNegocioFormData = localStorage.getItem("cargaNegocioFormData");
        if (cargaNegocioFormData) {
            setFormData(JSON.parse(cargaNegocioFormData));
        }
    }, [])
    
    useEffect(() => {                                                                           
        formRef.current = formData;
        localStorage.setItem("cargaNegocioFormData", JSON.stringify(formData));                 //Despues de actualizar el formData actualizamos el localstorage
        setCategoryANDsubcategoryStringJoin(`${formData.category}, ${formData.subcategory}`);
        formData.schedules.scheduleType === "P" ? setHDef(false) : setHDef(true);
        setSelectedProvincia(formData.state);
        setCitiesList(formData.state);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        formRef.current.registeremail = userData.email;

        if (formRef.current.schedules.scheduleType === "P") {
            //Si cargamos horarios personalizados ponemos el campo "custom" en null para no cargar informacion innecesaria
            formRef.current = {
                ...formRef.current,
                schedules: {
                    ...formRef.current.schedules,
                    custom: null,
                },
            };
        } else {
            //Si cargamos horarios "LaV" "LaS" o "LaD" ponemos el campo "personalized" en null para no cargar informacion innecesaria
            formRef.current = {
                ...formRef.current,
                schedules: {
                    ...formRef.current.schedules,
                    personalized: null,
                },
            };
        }

        const companyData = formRef.current;
        const completeData = new FormData();
        completeData.append("companyTextData", JSON.stringify(companyData));
        const logoFile = document.querySelector(".carga-company-logo-input").files[0];
        completeData.append("logo", logoFile);
        const files = document.querySelector(".carga-company-images-input").files;
        for (const file of files) {
            completeData.append("images", file);
        }
        showSpinner(true);
        const response = await addCompany(completeData);
        if (response.success) {
            swalPopUp("Tarea completada", response.message, "success");
            setFormData(formDataInitialValues);
            localStorage.setItem("cargaNegocioFormData", "");
        } else {
            swalPopUp("Error", response.message, "error");
        }
        showSpinner(false);
    };

<<<<<<< HEAD
              <div className="carga-imgs-empresa">
                <div className="carga-cuadro-edicion" onClick={selectImages}>
                  <PhotoIcon className="carga-iconUser" aria-hidden="true" />
                  <div className="carga-file-upload-wrapper">
                    <label
                      htmlFor="file-upload"
                      className="carga-file-upload-label"
                    >
                      Elegir archivos
                      <input
                        onChange={handleFilesChange}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple={true}
                        max={6}
                      />
                    </label>
                  </div>
                  <p>PNG, JPG, GIF up to 10MB</p>
                  <div name="images_names">{formData.images_names}</div>
                </div>
              </div>
            </div>
=======
    /*************************** Horarios  ****************************/

    const [hDef, setHDef] = useState(true);

    const diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    const generarHorarios = () => {
        const horarios = [];
        for (let hora = 0; hora < 24; hora++) {
            for (let minuto = 0; minuto < 60; minuto += 15) {
                const horaString = hora.toString().padStart(2, "0");
                const minutoString = minuto.toString().padStart(2, "0");
                horarios.push(`${horaString}:${minutoString}`);
            }
        }
        return horarios;
    };

    const setTipoHorarios = (e) => {
        //Tipo de horarios: LaV", "LaS", "LaD", "P"
        const valueSelected = e.target.value;
        setFormData((actualFormData) => ({
            ...actualFormData,
            schedules: {
                ...actualFormData.schedules,
                scheduleType: valueSelected,
            },
        }));
        valueSelected === "P" ? setHDef(false) : setHDef(true);
    };

    const handleInputChangeDef = (turno, e) => {
        //Cambio de horarios entre: "open1" "close1" "open2" "close2"
        const hour = e.target.value;
        setFormData((actualFormData) => ({
            ...actualFormData,
            schedules: {
                ...actualFormData.schedules,
                custom: {
                    ...actualFormData.schedules.custom,
                    [turno]: hour,
                },
            },
        }));
    };

    const handleInputChange = (dia, turno, e) => {
        //Cambio de horarios entre: "open1" "close1" "open2" "close2"
        const hour = e.target.value;
        setFormData((actualFormData) => ({
            ...actualFormData,
            schedules: {
                ...actualFormData.schedules,
                personalized: {
                    ...actualFormData.schedules.personalized,
                    [dia]: {
                        ...actualFormData.schedules.personalized[dia],
                        [turno]: hour,
                    },
                },
            },
        }));
    };

    const horarioPersJSX = //Horarios personalizados (Se puede elegir un horario diferente por cada dia de la semana)
        (
>>>>>>> 8b9cd381da96b116d11aa38f6a0c8353ed91216e
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Apertura</th>
                                <th>Cierre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diasSemana.map((dia) => {
                                dia = dia
                                    .normalize("NFD") //Saca acentos y pasa a minuscula
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLocaleLowerCase();
                                return (
                                    <>
                                        <tr key={dia}>
                                            <td>{dia}</td>
                                            <td className="diaOpenClose">
                                                <div className="input-group">
                                                    <select
                                                        value={formData.schedules.personalized[dia].open1}
                                                        defaultValue=""
                                                        onChange={(e) => handleInputChange(dia, "open1", e)}
                                                    >
                                                        <option value=""></option>
                                                        {generarHorarios().map((hora) => (
                                                            <option key={hora} value={hora}>
                                                                {hora}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        className="clear-btn"
                                                        onClick={() =>
                                                            handleInputChange(dia, "open1", {
                                                                target: { value: "" },
                                                            })
                                                        }
                                                    >
                                                        Limpiar
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="diaOpenClose">
                                                <div className="input-group">
                                                    <select
                                                        value={formData.schedules.personalized[dia].close1}
                                                        defaultValue=""
                                                        onChange={(e) =>
                                                            handleInputChange(dia, "close1", e)
                                                        }
                                                    >
                                                        <option value=""></option>
                                                        {generarHorarios().map((hora) => (
                                                            <option key={hora} value={hora}>
                                                                {hora}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        className="clear-btn"
                                                        onClick={() =>
                                                            handleInputChange(dia, "close1", {
                                                                target: { value: "" },
                                                            })
                                                        }
                                                    >
                                                        Limpiar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr key={dia}>
                                            <td></td>
                                            <td className="diaOpenClose">
                                                <div className="input-group">
                                                    <select
                                                        value={formData.schedules.personalized[dia].open2}
                                                        defaultValue=""
                                                        onChange={(e) => handleInputChange(dia, "open2", e)}
                                                    >
                                                        <option value=""></option>
                                                        {generarHorarios().map((hora) => (
                                                            <option key={hora} value={hora}>
                                                                {hora}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        className="clear-btn"
                                                        onClick={() =>
                                                            handleInputChange(dia, "open2", {
                                                                target: { value: "" },
                                                            })
                                                        }
                                                    >
                                                        Limpiar
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="diaOpenClose">
                                                <div className="input-group">
                                                    <select
                                                        value={formData.schedules.personalized[dia].close2}
                                                        defaultValue=""
                                                        onChange={(e) =>
                                                            handleInputChange(dia, "close2", e)
                                                        }
                                                    >
                                                        <option value=""></option>
                                                        {generarHorarios().map((hora) => (
                                                            <option key={hora} value={hora}>
                                                                {hora}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        className="clear-btn"
                                                        onClick={() =>
                                                            handleInputChange(dia, "close2", {
                                                                target: { value: "" },
                                                            })
                                                        }
                                                    >
                                                        Limpiar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );

    const horarioDefJSX = //Horarios Definidos para "Lunes a Viernes" "Lunes a Sabado" o "Todos lods dias"
        (
            <div>
                <div className="horarios-carga-empresa">
                    <table>
                        <thead>
                            <tr>
                                <th>Apertura</th>
                                <th>Cierre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select
                                        value={formData.schedules.custom.open1}
                                        defaultValue=""
                                        onChange={(e) => handleInputChangeDef("open1", e)}
                                    >
                                        <option value=""></option>
                                        {generarHorarios().map((hora) => (
                                            <option key={hora} value={hora}>
                                                {hora}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={formData.schedules.custom.close1}
                                        defaultValue=""
                                        onChange={(e) => handleInputChangeDef("close1", e)}
                                    >
                                        <option value=""></option>
                                        {generarHorarios().map((hora) => (
                                            <option key={hora} value={hora}>
                                                {hora}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        value={formData.schedules.custom.open2}
                                        defaultValue=""
                                        onChange={(e) => handleInputChangeDef("open2", e)}
                                    >
                                        <option value=""></option>
                                        {generarHorarios().map((hora) => (
                                            <option key={hora} value={hora}>
                                                {hora}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={formData.schedules.custom.close2}
                                        defaultValue=""
                                        onChange={(e) => handleInputChangeDef("close2", e)}
                                    >
                                        <option value=""></option>
                                        {generarHorarios().map((hora) => (
                                            <option key={hora} value={hora}>
                                                {hora}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );

<<<<<<< HEAD
          <div className="btn-carga-edicion">
            <button type="button" className="btn-cancelar-carga">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar-carga">
              Guardar
            </button>
          </div>
        </form>
        <div></div>
      </div>
    </section>
  );
=======
    /**********************************************************************************/

    return (
        <section className="bg-formEmpresa">
            <div>
                <form className="form-empresa" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="form-titulo">Carga de negocio</h1>
                        <p className="form-descripcion">
                            Si es propietario de un negocio referido al rubro automotor puede
                            cargarlo <b>GRATIS</b> en nuestro sitio web.
                        </p>

                        <div className="datos-form">
                            {/* Nombre Empresa*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="first-name">
                                    <i className="obligatorio">* </i>Nombre de Empresa
                                </label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.name}
                                        type="text"
                                        name="name"
                                        id="first-name"
                                        autoComplete="given-name"
                                    />
                                </div>
                            </div>
                            {/* Sologan Empresa*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="slogan">Slogan (opcional)</label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.slogan}
                                        type="text"
                                        name="slogan"
                                        id="slogan"
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>
                            {/* CUIT*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="postal-code">CUIT</label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.postal_code}
                                        type="text"
                                        name="postal_code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                    />
                                </div>
                            </div>
                            {/* Dirección*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="street-address">
                                    <i className="obligatorio">* </i>Dirección
                                </label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.location}
                                        type="text"
                                        name="location"
                                        id="street-address"
                                        autoComplete="street-address"
                                    />
                                </div>
                            </div>{" "}
                            {/* PROVINCIAS*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="region">
                                    <i className="obligatorio">* </i>Provincia
                                </label>

                                <div className="input-container">
                                    <select
                                        id="selectProvincias"
                                        onChange={handleProvinciaChange}
                                        value={selectedProvincia}
                                        name="state"
                                    >
                                        <option value="">Selecciona una provincia</option>
                                        {provinciasList.map((provincia, index) => (
                                            <option key={index} value={provincia}>
                                                {provincia}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* CIUDAD*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="city">
                                    <i className="obligatorio">* </i>Ciudad
                                </label>
                                <div className="input-container">
                                    <select
                                        id="selectCiudades"
                                        name="city"
                                        onChange={handleChange}
                                        value={formData.city}
                                    >
                                        <option value="">Selecciona una ciudad</option>
                                        {ciudades.map((ciudad, index) => (
                                            <option key={index} value={ciudad}>
                                                {ciudad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* CP*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="postal-code">
                                    <i className="obligatorio">* </i>Código Postal
                                </label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.postal_code}
                                        type="text"
                                        name="postal_code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                    />
                                </div>
                            </div>
                            {/* tel*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="phone">
                                    <i className="obligatorio">* </i>Teléfono
                                </label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.phone}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="given-name"
                                    />
                                </div>
                            </div>
                            {/* tel2*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="phone2">Teléfono Alternativo (opcional)</label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.phone2}
                                        type="text"
                                        name="phone2"
                                        id="phone2"
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>
                            {/* web*/}
                            <div className="campo-formEmpresa">
                                <label htmlFor="website">Sitio Web (opcional):</label>
                                <div className="input-container">
                                    <input
                                        onChange={handleChange}
                                        value={formData.website}
                                        type="text"
                                        name="website"
                                        id="website"
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>
                            {/* categoria*/}
                            <div className="campo-formEmpresa">
                                <div>
                                    <label>
                                        <i className="obligatorio">* </i>Categoría:{" "}
                                    </label>
                                    <div className="input-container">
                                        <select
                                            name="category"
                                            onChange={handleCategoryANDsubcategorySelect}     
                                            value={categoryANDsubcategoryStringJoin}
                                            defaultValue={"default"}
                                        >
                                            <option value="default">
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
                                                -- Talleres Mecánicos (Mecánico, Chapistas,
                                                Electricistas)
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
                    </div>
             
                    <div className="linea-divisoria"></div>
                    {/*horarios*/}
                    <div className="horarios-cont">
                        <label className="form-label-business">
                            <i className="obligatorio">* </i>Horarios:{" "}
                        </label>
                        <select
                            className="form-select-business btn-personalizar"
                            value={formData.schedules.scheduleType}
                            onChange={setTipoHorarios}
                        >
                            <option value="LaV">Lunes a Viernes</option>
                            <option value="LaS">Lunes a Sábado</option>
                            <option value="LaD">Todos los días</option>
                            <option value="P">Personalizar</option>
                        </select>
                        {hDef && horarioDefJSX}
                        {!hDef && horarioPersJSX}
                    </div>
                   
                    <div className="linea-divisoria"></div>

                    <div>
                        {/* URL */}
                        <div className="url-section">
                            <label htmlFor="username">
                                <i className="obligatorio">* </i>Ingrese la URL de su sitio web
                                comercial:
                            </label>
                            <div className="url-vfk">
                                <span>vefrek.com/</span>
                                <input
                                    value={formData.vefrek_website}
                                    onChange={handleChange}
                                    type="text"
                                    name="vefrek_website"
                                    id="username"
                                    autoComplete="username"
                                    placeholder="nombre-negocio"
                                />
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="description-section">
                            <label htmlFor="about">
                                <i className="obligatorio">* </i>Descripción
                            </label>
                            <div>
                                <textarea
                                    value={formData.description}
                                    onChange={handleChange}
                                    id="about"
                                    name="description"
                                    rows={3}
                                    className="txt-form"
                                    defaultValue={""}
                                    placeholder=" Describa brevemente su empresa."
                                />
                            </div>
                        </div>

                        {/*rrss*/}
                        <div className="campos-redes">
                            <form onSubmit={handleSubmit} className="custom-form-carga">
                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-whatsapp me-2"></i>
                                        <span className="obligatorio">*</span>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="whatsapp"
                                        value={formData.social.whatsapp}
                                        placeholder="WhatsApp"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fas fa-envelope me-2"></i>
                                        <span className="obligatorio">*</span>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="email"
                                        value={formData.social.email}
                                        placeholder="Mail"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-facebook me-2"></i>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="facebook"
                                        value={formData.social.facebook}
                                        placeholder="Facebook"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-instagram me-2"></i>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="instagram"
                                        value={formData.social.instagram}
                                        placeholder="Instagram"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-linkedin me-2"></i>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="linkedin"
                                        value={formData.social.linkedin}
                                        placeholder="LinkedIn"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-x me-2"></i>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="x"
                                        value={formData.social.x}
                                        placeholder="X"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-youtube me-2"></i>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="youtube"
                                        value={formData.social.youtube}
                                        placeholder="Youtube"
                                    />
                                </div>

                                <div className="campo-red">
                                    <label>
                                        <i className="fab fa-tiktok me-2"></i>
                                    </label>
                                    <input
                                        onChange={handleSocialChange}
                                        type="text"
                                        name="tiktok"
                                        value={formData.social.tiktok}
                                        placeholder="TikTok"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                   
                    <div className="linea-divisoria"></div>
                    {/*logo*/}
                    <div className="carga-logo-section">
                        <label htmlFor="photo">
                            <i className="obligatorio">* </i>Logo de su empresa
                        </label>
                        <div className="carga-seclogo">
                            <UserCircleIcon className="carga-icon-user" aria-hidden="true" />
                            <button
                                onClick={loadFile}
                                type="button"
                                className="carga-btn-custom"
                            >
                                Cargar
                            </button>
                            <input
                                onChange={handleFileChange}
                                className="carga-company-logo-input"
                                type="file"
                                name="logo_image_name"
                                accept="image/*"
                                single="true"
                            />
                            {formData.logo_image_name}
                        </div>

                        <div className="carga-images-section">
                            <label htmlFor="cover-photo">
                                <i className="obligatorio">* </i>Cargar imágenes de su negocio
                                (máximo 6):
                            </label>

                            <div className="carga-imgs-empresa">
                                <div className="carga-cuadro-edicion">
                                    <PhotoIcon className="carga-iconUser" aria-hidden="true" />
                                    <div
                                        className="carga-file-upload-wrapper"
                                        onClick={selectImages}
                                    >
                                        <label
                                            htmlFor="file-upload"
                                            className="carga-file-upload-label"
                                        >
                                            <input
                                                onChange={handleFilesChange}
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="carga-company-images-input"
                                                multiple={true}
                                                max={6}
                                            />
                                        </label>
                                    </div>
                                    <p>PNG, JPG, GIF up to 10MB</p>
                                    <div name="images_names">{formData.images_names}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span>
                                <i className="obligatorio">* </i>Campos obligatorios
                            </span>
                        </div>
                    </div>

                    <div className="linea-divisoria"></div>

                    <div className="btn-carga-edicion">
                        <button type="button" className="btnCancel">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-guardar" >                 {/* onClick={handleGuardar} */}
                            Guardar
                                                                                        {/* {showPopup && <PopUpEmpresa onClose={handleClosePopup} />} */}
                        </button>
                    </div>
                </form>
                <div></div>
            </div>
        </section>
    );
>>>>>>> 8b9cd381da96b116d11aa38f6a0c8353ed91216e
};

export default CargaEmpresa;
